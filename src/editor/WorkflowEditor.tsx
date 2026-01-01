import { type Component, createSignal, Show } from 'solid-js';
import { EdgesUI } from '../edges';
import { NodesUI } from '../nodes';
import {
  type Drag,
  type DragEdge,
  type Edge,
  type IconProps,
  isDragEdge,
  isDragGrid,
  isDragNode,
  type Node,
  type NodeTemplate,
  type Selection,
  type Side,
  type Vec,
} from '../types';
import { addVec, snapToGrid, subVec } from '../utils';
import SelectionSidebar from './sidebar';
import { useWorkflowContext } from './stores';
import TemplateToolbar from './TemplateToolbar';

const WorkflowEditor: Component<{
  nodeTemplates: NodeTemplate[];
  Icon: Component<IconProps>;
}> = ({ nodeTemplates, Icon }) => {
  const { workflow, setWorkflow } = useWorkflowContext();
  const [drag, setDrag] = createSignal<Drag>();
  const [selection, setSelection] = createSignal<Selection>();
  const [translation, setTranslation] = createSignal<Vec>({ x: 0, y: 0 });
  let contentRef!: HTMLDivElement;

  const onMouseDown = (event: MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    const nodeElement = targetElement.closest<HTMLElement>('[data-node]');
    const edgeElement = targetElement.closest<HTMLElement>('[data-edge]');
    const portElement = targetElement.closest<HTMLElement>('[data-port]');
    const gridElement = targetElement.closest<HTMLElement>('[data-grid]');
    const sidebarElement = targetElement.closest<HTMLElement>('[data-sidebar]');
    const nodeTemplateElement =
      targetElement.closest<HTMLElement>('[data-template-id]');
    const contentBox = contentRef.getBoundingClientRect();
    const mousePos = { x: event.clientX, y: event.clientY };
    const mousePosRelToGrid = subVec(mousePos, contentBox);

    if (sidebarElement) {
      // interacting with the sidebar
    } else if (portElement && nodeElement) {
      // create an edge
      event.preventDefault();
      const fromSide = portElement.dataset.side as Side;
      setDrag({
        type: 'edge',
        fromNodeId: nodeElement.id,
        fromSide,
        posRelToGrid: mousePosRelToGrid,
      });
    } else if (nodeElement) {
      event.preventDefault();
      const nodeBox = nodeElement.getBoundingClientRect();
      const posRelToNode = subVec(mousePos, nodeBox);
      setDrag({ type: 'node', id: nodeElement.id, posRelToNode });
      setSelection({ id: nodeElement.id, type: 'node' });
    } else if (gridElement && !nodeTemplateElement && !edgeElement) {
      event.preventDefault();
      setDrag({
        type: 'grid',
        startPos: mousePos,
        startTranslation: translation(),
      });
      setSelection();
    } else if (nodeTemplateElement) {
      event.preventDefault();
      const template = nodeTemplates.find(
        (t) => t.id === nodeTemplateElement.dataset.templateId,
      );
      if (!template) return;
      const posRelToNode: Vec = { x: 20, y: 20 };
      const node: Node = {
        id: Math.random().toString(),
        ...subVec(mousePosRelToGrid, posRelToNode),
        width: template.width,
        height: template.height,
        shape: template.shape,
        title: template.title,
      };
      setWorkflow((workflow) => ({
        ...workflow,
        nodes: { ...workflow.nodes, [node.id]: node },
      }));
      setDrag({ type: 'node', id: node.id, posRelToNode });
    } else if (edgeElement) {
      console.log('edgeElement');
      event.preventDefault();
      setSelection({ id: edgeElement.id, type: 'edge' });
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    const draggedItem = drag();
    if (!draggedItem) return;

    const contentBox = contentRef.getBoundingClientRect();
    const mousePos = { x: event.clientX, y: event.clientY };
    const mousePosRelToGrid = subVec(mousePos, contentBox);
    if (isDragNode(draggedItem)) {
      setWorkflow((workflow) => {
        const node = workflow.nodes[draggedItem.id];
        if (!node) return workflow;
        return {
          ...workflow,
          nodes: {
            ...workflow.nodes,
            [draggedItem.id]: {
              ...node,
              ...subVec(mousePosRelToGrid, draggedItem.posRelToNode),
            },
          },
        };
      });
    } else if (isDragEdge(draggedItem)) {
      setDrag((oldDrag) => {
        if (!isDragEdge(oldDrag)) return oldDrag;
        return {
          ...oldDrag,
          posRelToGrid: mousePosRelToGrid,
        } satisfies DragEdge;
      });
    } else if (isDragGrid(draggedItem)) {
      const totalMouseMove = subVec(mousePos, draggedItem.startPos);
      setTranslation(addVec(totalMouseMove, draggedItem.startTranslation));
    }
  };

  const onMouseUp = (event: MouseEvent) => {
    const d = drag();
    if (isDragEdge(d)) {
      // create the edge
      const targetElement = event.target as HTMLElement;
      const nodeElement = targetElement.closest<HTMLElement>('[data-node]');
      const portElement = targetElement.closest<HTMLElement>('[data-port]');
      if (nodeElement && portElement) {
        const to = nodeElement.id;
        const toSide = portElement.dataset.side as Side;

        const exists = Object.values(workflow.edges).some(
          (edge) =>
            edge.from === d.fromNodeId &&
            edge.to === to &&
            edge.fromSide === d.fromSide &&
            edge.toSide === toSide,
        );
        if (!exists && to !== d.fromNodeId) {
          const newEdge: Edge = {
            id: Math.random().toString(),
            from: d.fromNodeId,
            to,
            fromSide: d.fromSide,
            toSide,
          };
          setWorkflow((workflow) => {
            return {
              ...workflow,
              edges: {
                ...workflow.edges,
                [newEdge.id]: newEdge,
              },
            };
          });
        }
      }
    } else if (isDragNode(d)) {
      setWorkflow((workflow) => {
        return {
          ...workflow,
          nodes: {
            ...workflow.nodes,
            [d.id]: {
              ...workflow.nodes[d.id],
              ...snapToGrid(workflow.nodes[d.id], 10),
            },
          },
        };
      });
    }
    setDrag();
  };

  return (
    <div
      data-grid
      on:mousedown={onMouseDown}
      on:mouseup={onMouseUp}
      on:mousemove={onMouseMove}
      class="h-full bg-gray-100 bg-repeat"
      classList={{
        'cursor-grabbing': isDragGrid(drag()),
        'cursor-grab': !isDragGrid(drag()) && !isDragEdge(drag()),
        '**:cursor-crosshair!': isDragEdge(drag()),
        'bg-size-[50px_50px]': true,
        'bg-radial-[Circle_at_Center,var(--color-gray-300)_1px,transparent_2px]': true,
      }}
      style={{
        'background-position': `${translation().x}px ${translation().y}px`,
      }}
    >
      <TemplateToolbar nodeTemplates={nodeTemplates} Icon={Icon} drag={drag} />
      <Show when={selection()}>
        <SelectionSidebar selection={selection} />
      </Show>
      <div
        ref={contentRef}
        style={{ translate: `${translation().x}px ${translation().y}px` }}
      >
        <NodesUI selection={selection} />
        <EdgesUI drag={drag} selection={selection} />
      </div>
    </div>
  );
};

export default WorkflowEditor;
