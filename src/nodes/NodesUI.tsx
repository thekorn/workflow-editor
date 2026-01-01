import { type Accessor, type Component, For } from 'solid-js';
import { useWorkflowContext } from '../editor/stores';
import type { Selection } from '../types';
import NodeUI from './NodeUI';

const NodesUI: Component<{ selection: Accessor<Selection | undefined> }> = ({
  selection,
}) => {
  const { workflow } = useWorkflowContext();

  return (
    <For each={Object.values(workflow.nodes)}>
      {(node) => <NodeUI node={node} selection={selection} />}
    </For>
  );
};

export default NodesUI;
