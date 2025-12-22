import { type Component, createSignal } from 'solid-js';
import { EdgesUI } from '../edges';
import { NodesUI } from '../nodes';
import {
  type Drag,
  type Edge,
  isDragEdge,
  isDragNode,
  type Side,
  type Workflow,
} from '../types';
import { snapToGrid, subVec } from '../utils';
import { createWorkflowStore, WorkflowContext } from './store';

const WorkflowEditor: Component<{ workflowConfig: Workflow }> = ({
  workflowConfig,
}) => {
  const [workflow, setWorkflow] = createWorkflowStore(workflowConfig);
  const [drag, setDrag] = createSignal<Drag>();

  const onMouseDown = (event: MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    const nodeElement = targetElement.closest<HTMLElement>('[data-node]');
    const portElement = targetElement.closest<HTMLElement>('[data-port]');
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
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    if (!drag()) return;
    setWorkflow((workflow) => {
      const draggedItem = drag();
      if (!isDragNode(draggedItem)) return workflow;
      const node = workflow.nodes[draggedItem.id];
      if (!node) return workflow;

      const mousePos = { x: event.clientX, y: event.clientY };
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
    setDrag((oldDrag) => {
      const draggedItem = drag();

      if (!oldDrag || !isDragEdge(draggedItem)) return oldDrag;
      const mousePos = { x: event.clientX, y: event.clientY };
      return {
        ...oldDrag,
        pos: mousePos,
      };
    });
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
        on:mousedown={onMouseDown}
        on:mouseup={onMouseUp}
        on:mousemove={onMouseMove}
        class="h-full bg-gray-100 bg-repeat"
        classList={{
          'bg-size-[50px_50px]': true,
          'bg-radial-[Circle_at_Center,var(--color-gray-300)_1px,transparent_2px]': true,
        }}
      >
        <NodesUI />
        <EdgesUI drag={drag} />
      </div>
    </WorkflowContext.Provider>
  );
};

export default WorkflowEditor;
