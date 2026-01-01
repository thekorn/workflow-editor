import { type Component, createMemo, For, Show } from 'solid-js';
import { useDragContext, useWorkflowContext } from '@/stores';
import { isDragEdge, type Side } from '@/types';
import EdgeMarker from './EdgeMarker';
import EdgeUI from './EdgeUI';
import { getPortPosition } from './utils';

const EdgesUI: Component = () => {
  const { workflow } = useWorkflowContext();
  const { drag } = useDragContext();
  const getPortPositionOfNodeAndSide = (nodeId: string, side: Side) => {
    return createMemo(() => getPortPosition(workflow.nodes[nodeId], side));
  };

  const getDragEdge = createMemo(() => {
    const d = drag();
    return isDragEdge(d) ? d : undefined;
  });

  return (
    <svg class="overflow-visible">
      <defs>
        <EdgeMarker />
      </defs>
      <title>Workflow edges</title>
      <For each={Object.values(workflow.edges)}>
        {(edge) => (
          <EdgeUI
            id={edge.id}
            from={getPortPositionOfNodeAndSide(edge.from, edge.fromSide)}
            to={getPortPositionOfNodeAndSide(edge.to, edge.toSide)}
            connected={true}
            title={() => edge.title}
          />
        )}
      </For>
      <Show when={getDragEdge()}>
        {(d) => (
          <EdgeUI
            from={getPortPositionOfNodeAndSide(d().fromNodeId, d().fromSide)}
            to={() => d().posRelToGrid}
          />
        )}
      </Show>
    </svg>
  );
};

export default EdgesUI;
