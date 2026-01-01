import type { Vec } from '@/types';

export function addVec(a: Vec, b: Vec): Vec {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function subVec(a: Vec, b: Vec): Vec {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function snapToGrid(vec: Vec, gridSize: number): Vec {
  return {
    x: Math.round(vec.x / gridSize) * gridSize,
    y: Math.round(vec.y / gridSize) * gridSize,
  };
}
