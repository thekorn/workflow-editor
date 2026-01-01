import type { Component } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import type { Node, NodeShape } from '../types';
import Port from './Port';
import { Diamond, Ellipse, Pill, Rectangle } from './shapes';
import type { ShapeComponent } from './shapes/types';

const shapes: Record<NodeShape, ShapeComponent> = {
  rectangle: Rectangle,
  diamond: Diamond,
  ellipse: Ellipse,
  pill: Pill,
};

const NodeUI: Component<{ node: Node }> = ({ node }) => {
  return (
    <div
      id={node.id}
      data-node
      class="group absolute z-0 cursor-move content-center items-center justify-center justify-items-center text-center"
      style={{
        left: `${node.x}px`,
        top: `${node.y}px`,
        width: `${node.width}px`,
        height: `${node.height}px`,
      }}
    >
      <Dynamic
        component={shapes[node.shape]}
        width={node.width}
        height={node.height}
      />
      {node.title}
      <Port side="left" />
      <Port side="right" />
      <Port side="top" />
      <Port side="bottom" />
    </div>
  );
};

export default NodeUI;
