import { type Component, For } from 'solid-js';
import { useWorkflowContext } from '@/stores';
import NodeUI from './NodeUI';

const NodesUI: Component = () => {
  const { workflow } = useWorkflowContext();

  return (
    <For each={Object.values(workflow.nodes)}>
      {(node) => <NodeUI node={node} />}
    </For>
  );
};

export default NodesUI;
