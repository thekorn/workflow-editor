import { createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import type { Workflow } from '../types';

export function createWorkflowStore(workflow: Workflow) {
  return createStore<Workflow>(workflow);
}

export const WorkflowContext = createContext<ReturnType<typeof createWorkflowStore>>();

export const useWorkflowContext = () => {
  const workflowHandler = useContext(WorkflowContext);
  if (!workflowHandler) {
    throw new Error(
      'useWorkflowContext should be called inside its ContextProvider',
    );
  }
  return workflowHandler;
};
