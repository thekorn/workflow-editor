export type Node = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  shape: NodeShape;
  title: string;
};

export type NodeShape = 'rectangle' | 'diamond' | 'pill' | 'ellipse';

export type Vec = { x: number; y: number };

export type Workflow = {
  nodes: Record<string, Node>;
  edges: Record<string, Edge>;
};

type DragNode = { type: 'node'; id: string; posRelToNode: Vec };
type DragEdge = { type: 'edge'; fromNodeId: string; fromSide: Side; pos: Vec };
type DragGrid = { type: 'grid'; startPos: Vec, startTranslation: Vec };
export type Drag = DragNode | DragEdge | DragGrid;

export function isDragNode(drag?: Drag): drag is DragNode {
  return drag?.type === 'node';
}

export function isDragEdge(drag?: Drag): drag is DragEdge {
  return drag?.type === 'edge';
}

export function isDragGrid(drag?: Drag): drag is DragGrid {
  return drag?.type === 'grid';
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
