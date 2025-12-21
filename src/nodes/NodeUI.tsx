import type { Component } from "solid-js";
import type { Node } from "../types";
import Port from "./Port";

const NodeUI: Component<{ node: Node }> = ({ node }) => {
  //console.log("render NodeUI", node);
  return (
    <div
      id={node.id}
      data-node
      class="group cursor-move absolute justify-center items-center justify-items-center content-center text-center rounded-md border-2 border-gray-500"
      style={{
        left: `${node.x}px`,
        top: `${node.y}px`,
        width: `${node.width}px`,
        height: `${node.height}px`,
      }}
    >
      {node.title}
      <Port side="left" />
      <Port side="right" />
      <Port side="top" />
      <Port side="bottom" />
    </div>
  );
};

export default NodeUI;
