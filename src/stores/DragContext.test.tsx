import { describe, expect, it } from 'vitest';
import type { Drag } from '@/types';

function isDragNode(drag?: Drag): drag is Drag & { type: 'node' } {
  return drag?.type === 'node';
}

function isDragEdge(drag?: Drag): drag is Drag & { type: 'edge' } {
  return drag?.type === 'edge';
}

function isDragGrid(drag?: Drag): drag is Drag & { type: 'grid' } {
  return drag?.type === 'grid';
}

describe('Drag type guards', () => {
  describe('isDragNode', () => {
    it('returns true for DragNode', () => {
      const drag: Drag = {
        type: 'node',
        id: 'test-node',
        posRelToNode: { x: 10, y: 20 },
      };
      expect(isDragNode(drag)).toBe(true);
    });

    it('returns false for DragEdge', () => {
      const drag: Drag = {
        type: 'edge',
        fromNodeId: 'node-1',
        fromSide: 'right',
        posRelToGrid: { x: 50, y: 50 },
      };
      expect(isDragNode(drag)).toBe(false);
    });

    it('returns false for DragGrid', () => {
      const drag: Drag = {
        type: 'grid',
        startPos: { x: 0, y: 0 },
        startTranslation: { x: 10, y: 10 },
      };
      expect(isDragNode(drag)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(isDragNode(undefined)).toBe(false);
    });

    it('returns false for null', () => {
      expect(isDragNode(null as unknown as Drag)).toBe(false);
    });
  });

  describe('isDragEdge', () => {
    it('returns true for DragEdge', () => {
      const drag: Drag = {
        type: 'edge',
        fromNodeId: 'node-1',
        fromSide: 'right',
        posRelToGrid: { x: 50, y: 50 },
      };
      expect(isDragEdge(drag)).toBe(true);
    });

    it('returns false for DragNode', () => {
      const drag: Drag = {
        type: 'node',
        id: 'test-node',
        posRelToNode: { x: 10, y: 20 },
      };
      expect(isDragEdge(drag)).toBe(false);
    });

    it('returns false for DragGrid', () => {
      const drag: Drag = {
        type: 'grid',
        startPos: { x: 0, y: 0 },
        startTranslation: { x: 10, y: 10 },
      };
      expect(isDragEdge(drag)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(isDragEdge(undefined)).toBe(false);
    });
  });

  describe('isDragGrid', () => {
    it('returns true for DragGrid', () => {
      const drag: Drag = {
        type: 'grid',
        startPos: { x: 0, y: 0 },
        startTranslation: { x: 10, y: 10 },
      };
      expect(isDragGrid(drag)).toBe(true);
    });

    it('returns false for DragNode', () => {
      const drag: Drag = {
        type: 'node',
        id: 'test-node',
        posRelToNode: { x: 10, y: 20 },
      };
      expect(isDragGrid(drag)).toBe(false);
    });

    it('returns false for DragEdge', () => {
      const drag: Drag = {
        type: 'edge',
        fromNodeId: 'node-1',
        fromSide: 'right',
        posRelToGrid: { x: 50, y: 50 },
      };
      expect(isDragGrid(drag)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(isDragGrid(undefined)).toBe(false);
    });
  });
});

describe('DragContext value structure', () => {
  it('has correct type structure for node drag', () => {
    const drag: Drag = {
      type: 'node',
      id: 'test-node',
      posRelToNode: { x: 10, y: 20 },
    };
    expect(drag.type).toBe('node');
    expect(drag.id).toBe('test-node');
    expect(drag.posRelToNode).toEqual({ x: 10, y: 20 });
  });

  it('has correct type structure for edge drag', () => {
    const drag: Drag = {
      type: 'edge',
      fromNodeId: 'node-1',
      fromSide: 'right',
      posRelToGrid: { x: 50, y: 50 },
    };
    expect(drag.type).toBe('edge');
    expect(drag.fromNodeId).toBe('node-1');
    expect(drag.fromSide).toBe('right');
    expect(drag.posRelToGrid).toEqual({ x: 50, y: 50 });
  });

  it('has correct type structure for grid drag', () => {
    const drag: Drag = {
      type: 'grid',
      startPos: { x: 0, y: 0 },
      startTranslation: { x: 10, y: 10 },
    };
    expect(drag.type).toBe('grid');
    expect(drag.startPos).toEqual({ x: 0, y: 0 });
    expect(drag.startTranslation).toEqual({ x: 10, y: 10 });
  });
});
