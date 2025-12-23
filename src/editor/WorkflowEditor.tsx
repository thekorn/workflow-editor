import { type Component, createSignal } from 'solid-js';
import { EdgesUI } from '../edges';
import { NodesUI } from '../nodes';
import {
  type Drag,
  type Edge,
  isDragEdge,
  isDragGrid,
  isDragNode,
  type Side,
  type Vec,
  type Workflow,
} from '../types';
import { addVec, snapToGrid, subVec } from '../utils';
import { createWorkflowStore, WorkflowContext } from './store';

const WorkflowEditor: Component<{ workflowConfig: Workflow }> = ({
  workflowConfig,
}) => {
  const [workflow, setWorkflow] = createWorkflowStore(workflowConfig);
  const [drag, setDrag] = createSignal<Drag>();
  const [translation, setTranslation] = createSignal<Vec>({ x: 0, y: 0 });

  const onMouseDown = (event: MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    const nodeElement = targetElement.closest<HTMLElement>('[data-node]');
    const portElement = targetElement.closest<HTMLElement>('[data-port]');
    const gridElement = targetElement.closest<HTMLElement>('[data-grid]');
    const mousePos = { x: event.clientX, y: event.clientY };
    if (portElement && nodeElement) {
      // create an edge
      event.preventDefault();
      const fromSide = portElement.dataset.side as Side;
      setDrag({
        type: 'edge',
        fromNodeId: nodeElement.id,
        fromSide,
        pos: mousePos,
      });
    } else if (nodeElement) {
      event.preventDefault();
      const nodeBox = nodeElement.getBoundingClientRect();
      const posRelToNode = subVec(mousePos, nodeBox);
      setDrag({ type: 'node', id: nodeElement.id, posRelToNode });
    } else if (gridElement) {
      event.preventDefault();
      setDrag({
        type: 'grid',
        startPos: mousePos,
        startTranslation: translation(),
      });
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    const draggedItem = drag();
    if (!draggedItem) return;

    const mousePos = { x: event.clientX, y: event.clientY };
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
              ...subVec(mousePos, draggedItem.posRelToNode),
            },
          },
        };
      });
    } else if (isDragEdge(draggedItem)) {
      setDrag((oldDrag) => {
        if (!oldDrag) return oldDrag;
        return {
          ...oldDrag,
          pos: mousePos,
        };
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
    <WorkflowContext.Provider value={[workflow, setWorkflow]}>
      <div
        data-grid
        on:mousedown={onMouseDown}
        on:mouseup={onMouseUp}
        on:mousemove={onMouseMove}
        class="h-full bg-gray-100 bg-repeat"
        classList={{
          'cursor-grabbing': isDragGrid(drag()),
          'cursor-grab': !isDragGrid(drag()),
          'bg-size-[50px_50px]': true,
          'bg-radial-[Circle_at_Center,var(--color-gray-300)_1px,transparent_2px]': true,
        }}
        style={{
          'background-position': `${translation().x}px ${translation().y}px`,
        }}
      >
        <div style={{ translate: `${translation().x}px ${translation().y}px` }}>
          <NodesUI />
          <EdgesUI drag={drag} />
        </div>
      </div>
    </WorkflowContext.Provider>
  );
};

export default WorkflowEditor;
