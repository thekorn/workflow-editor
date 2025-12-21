import {
  createEffect,
  createMemo,
  type Accessor,
  type Component,
  For,
  Show,
} from "solid-js";
import type { Drag, Side, Workflow } from "../types";
import EdgeMarker from "./EdgeMarker";
import EdgeUI from "./EdgeUI";
import { getPortPosition } from "./utils";

const EdgesUI: Component<{
  workflow: Accessor<Workflow>;
  drag?: Accessor<Drag | undefined>;
}> = ({ workflow, drag }) => {
  const getPortPositionOfNodeAndSide = (nodeId: string, side: Side) => {
    return createMemo(() => getPortPosition(workflow().nodes[nodeId], side));
  };
  return (
    <svg class="overflow-visible">
      <defs>
        <EdgeMarker />
      </defs>
      <title>Workflow edges</title>
      <For each={Object.values(workflow().edges)}>
        {(edge) => (
          <EdgeUI
            id={edge.id}
            from={getPortPositionOfNodeAndSide(edge.from, edge.fromSide)}
            to={getPortPositionOfNodeAndSide(edge.to, edge.toSide)}
          />
        )}
      </For>
      {/*<Show when={drag?.()?.type === "edge"}>
        <EdgeUI
          //@ts-expect-error TODO: we need to be type safe here
          from={getPortPosition(workflow().nodes[drag().from], drag().fromSide)}
          //@ts-expect-error TODO: we need to be type safe here
          to={drag?.pos}
        />
      </Show>*/}
    </svg>
  );
};

export default EdgesUI;
