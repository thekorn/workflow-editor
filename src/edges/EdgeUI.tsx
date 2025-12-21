import { type Accessor, type Component, createMemo } from "solid-js";
import type { Vec } from "../types";

const EdgeUI: Component<{
  id?: string;
  from: Accessor<Vec>;
  to: Accessor<Vec>;
}> = ({ id, from, to }) => {
  const pathDef = createMemo(
    () => `M ${from().x} ${from().y} L ${to().x} ${to().y}`,
  );
  return (
    <g id={id}>
      <path
        class="stroke-1 stroke-red-800"
        d={pathDef()}
        marker-end="url(#arrowHead)"
      />
    </g>
  );
};

export default EdgeUI;
