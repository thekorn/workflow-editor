import { createContext, type ParentComponent, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import type { Edge, Node, Workflow } from '../../types';

function createWorkflowStore(workflow: Workflow) {
  const [workflowState, setWorkflow] = createStore<Workflow>(workflow);

  function deleteNode(nodeId: string) {
    setWorkflow((workflow) => {
      const { [nodeId]: _, ...rest } = workflow.nodes;
      return {
        ...workflow,
        nodes: rest,
      };
    });
  }

  function deleteEdge(edgeId: string) {
    setWorkflow((workflow) => {
      const { [edgeId]: _, ...rest } = workflow.edges;
      return {
        ...workflow,
        edges: rest,
      };
    });
  }

  function updateEdge(edgeId: string, partialEdge: Partial<Edge>) {
    const edge = workflow.edges[edgeId];
    setWorkflow((workflow) => ({
      ...workflow,
      edges: { ...workflow.edges, [edgeId]: { ...edge, ...partialEdge } },
    }));
  }

  function updateNode(nodeId: string, partialNode: Partial<Node>) {
    const node = workflow.nodes[nodeId];
    setWorkflow((workflow) => ({
      ...workflow,
      nodes: { ...workflow.nodes, [nodeId]: { ...node, ...partialNode } },
    }));
  }

  return {
    workflow: workflowState,
    setWorkflow,
    deleteNode,
    deleteEdge,
    updateEdge,
    updateNode,
  };
}

type WorkflowContextValue = ReturnType<typeof createWorkflowStore>;

const WorkflowContext = createContext<WorkflowContextValue>();

export const WorkflowProvider: ParentComponent<{ workflow: Workflow }> = ({
  workflow,
  children,
}) => {
  const workflowStore = createWorkflowStore(workflow);
  return (
    <WorkflowContext.Provider value={workflowStore}>
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflowContext = () => {
  const context = useContext(WorkflowContext);
  //if (!context) {
  //  throw new Error(
  //    'useWorkflowContext should be called inside its ContextProvider',
  //  );
  //}
  return context;
};
