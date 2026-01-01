import { describe, expect, it } from 'vitest';
import type { Selection } from '@/types';

describe('Selection type structure', () => {
  it('has correct type structure for node selection', () => {
    const selection: Selection = { type: 'node', id: 'node-1' };
    expect(selection.type).toBe('node');
    expect(selection.id).toBe('node-1');
  });

  it('has correct type structure for edge selection', () => {
    const selection: Selection = { type: 'edge', id: 'edge-1' };
    expect(selection.type).toBe('edge');
    expect(selection.id).toBe('edge-1');
  });

  it('allows creating selections with different ids', () => {
    const nodeSelection: Selection = { type: 'node', id: 'test-node-id' };
    const edgeSelection: Selection = { type: 'edge', id: 'test-edge-id' };

    expect(nodeSelection.id).toBe('test-node-id');
    expect(edgeSelection.id).toBe('test-edge-id');
  });
});

describe('Selection equality', () => {
  it('selections with same type and id are equal', () => {
    const selection1: Selection = { type: 'node', id: 'node-1' };
    const selection2: Selection = { type: 'node', id: 'node-1' };

    expect(selection1.type).toBe(selection2.type);
    expect(selection1.id).toBe(selection2.id);
  });

  it('selections with different type are not equal', () => {
    const nodeSelection: Selection = { type: 'node', id: 'item-1' };
    const edgeSelection: Selection = { type: 'edge', id: 'item-1' };

    expect(nodeSelection.type).not.toBe(edgeSelection.type);
  });

  it('selections with different id are not equal', () => {
    const selection1: Selection = { type: 'node', id: 'node-1' };
    const selection2: Selection = { type: 'node', id: 'node-2' };

    expect(selection1.id).not.toBe(selection2.id);
  });
});
