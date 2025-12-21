export type Node = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
};

export type Vec = { x: number; y: number };

export type Workflow = {
  nodes: Record<string, Node>;
  edges: Record<string, Edge>;
};

type DragNode = { type: 'node'; id: string; posRelToNode: Vec };
type DragEdge = { type: 'edge'; fromNodeId: string; fromSide: Side; pos: Vec };
export type Drag = DragNode | DragEdge;

export function isDragNode(drag?: Drag): drag is DragNode {
  return drag?.type === 'node';
}

export function isDragEdge(drag?: Drag): drag is DragEdge {
  return drag?.type === 'edge';
}

export type Side = 'left' | 'right' | 'top' | 'bottom';

export type Edge = {
  id: string;
  from: string;
  to: string;
  fromSide: Side;
  toSide: Side;
  title?: string;
};
