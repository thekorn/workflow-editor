import type { Component } from 'solid-js';

export type ShapeProps = {
  width: number;
  height: number;
  class?: string;
};

export type ShapeComponent = Component<ShapeProps>;
