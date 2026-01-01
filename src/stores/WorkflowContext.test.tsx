import { beforeEach, describe, expect, it } from 'vitest';
import type { Edge, Node, Workflow } from '@/types';

interface WorkflowStore {
  workflow: Workflow;
  setWorkflow: () => void;
  deleteNode: (nodeId: string) => void;
  deleteEdge: (edgeId: string) => void;
  updateEdge: (edgeId: string, partialEdge: Partial<Edge>) => void;
  updateNode: (nodeId: string, partialNode: Partial<Node>) => void;
}

function createWorkflowStore(workflow: Workflow): WorkflowStore {
  const nodes: Record<string, Node> = { ...workflow.nodes };
  const edges: Record<string, Edge> = { ...workflow.edges };

  function deleteNode(nodeId: string) {
    delete nodes[nodeId];
    Object.keys(edges).forEach((edgeId) => {
      if (edges[edgeId].from === nodeId || edges[edgeId].to === nodeId) {
        delete edges[edgeId];
      }
    });
  }

  function deleteEdge(edgeId: string) {
    delete edges[edgeId];
  }

  function updateEdge(edgeId: string, partialEdge: Partial<Edge>) {
    const edge = edges[edgeId];
    if (edge) {
      edges[edgeId] = { ...edge, ...partialEdge };
    }
  }

  function updateNode(nodeId: string, partialNode: Partial<Node>) {
    const node = nodes[nodeId];
    if (node) {
      nodes[nodeId] = { ...node, ...partialNode };
    }
  }

  return {
    workflow: { nodes, edges },
    setWorkflow: () => {},
    deleteNode,
    deleteEdge,
    updateEdge,
    updateNode,
  };
}

const createTestWorkflow = (): Workflow => ({
  nodes: {
    'node-1': {
      id: 'node-1',
      x: 0,
      y: 0,
      width: 100,
      height: 50,
      shape: 'rectangle',
      title: 'Node 1',
    },
    'node-2': {
      id: 'node-2',
      x: 100,
      y: 0,
      width: 100,
      height: 50,
      shape: 'rectangle',
      title: 'Node 2',
    },
    'node-3': {
      id: 'node-3',
      x: 200,
      y: 0,
      width: 100,
      height: 50,
      shape: 'rectangle',
      title: 'Node 3',
    },
  },
  edges: {
    'edge-1': {
      id: 'edge-1',
      from: 'node-1',
      to: 'node-2',
      fromSide: 'right',
      toSide: 'left',
    },
    'edge-2': {
      id: 'edge-2',
      from: 'node-2',
      to: 'node-3',
      fromSide: 'right',
      toSide: 'left',
    },
  },
});

describe('WorkflowStore', () => {
  let store: WorkflowStore;

  beforeEach(() => {
    store = createWorkflowStore(createTestWorkflow());
  });

  describe('initial state', () => {
    it('has correct initial nodes', () => {
      expect(Object.keys(store.workflow.nodes)).toHaveLength(3);
      expect(store.workflow.nodes['node-1']).toBeDefined();
      expect(store.workflow.nodes['node-2']).toBeDefined();
      expect(store.workflow.nodes['node-3']).toBeDefined();
    });

    it('has correct initial edges', () => {
      expect(Object.keys(store.workflow.edges)).toHaveLength(2);
      expect(store.workflow.edges['edge-1']).toBeDefined();
      expect(store.workflow.edges['edge-2']).toBeDefined();
    });
  });

  describe('deleteNode', () => {
    it('removes a node from the workflow', () => {
      store.deleteNode('node-1');

      expect(store.workflow.nodes['node-1']).toBeUndefined();
      expect(Object.keys(store.workflow.nodes)).toHaveLength(2);
    });

    it('also removes connected edges when deleting a node', () => {
      store.deleteNode('node-2');

      expect(store.workflow.nodes['node-2']).toBeUndefined();
      expect(Object.keys(store.workflow.nodes)).toHaveLength(2);
      expect(store.workflow.edges['edge-1']).toBeUndefined();
      expect(store.workflow.edges['edge-2']).toBeUndefined();
      expect(Object.keys(store.workflow.edges)).toHaveLength(0);
    });

    it('only removes the specified node and its connected edges', () => {
      store.deleteNode('node-1');

      expect(store.workflow.nodes['node-2']).toBeDefined();
      expect(store.workflow.nodes['node-3']).toBeDefined();
      expect(store.workflow.edges['edge-2']).toBeDefined();
    });
  });

  describe('deleteEdge', () => {
    it('removes an edge from the workflow', () => {
      store.deleteEdge('edge-1');

      expect(store.workflow.edges['edge-1']).toBeUndefined();
      expect(Object.keys(store.workflow.edges)).toHaveLength(1);
    });

    it('does not affect other edges', () => {
      store.deleteEdge('edge-1');

      expect(store.workflow.edges['edge-2']).toBeDefined();
    });
  });

  describe('updateNode', () => {
    it('updates a node with partial data', () => {
      store.updateNode('node-1', { title: 'Updated Node' });

      expect(store.workflow.nodes['node-1'].title).toBe('Updated Node');
    });

    it('preserves other node properties', () => {
      store.updateNode('node-1', { title: 'Updated Node' });

      expect(store.workflow.nodes['node-1'].id).toBe('node-1');
      expect(store.workflow.nodes['node-1'].x).toBe(0);
      expect(store.workflow.nodes['node-1'].y).toBe(0);
      expect(store.workflow.nodes['node-1'].width).toBe(100);
      expect(store.workflow.nodes['node-1'].height).toBe(50);
      expect(store.workflow.nodes['node-1'].shape).toBe('rectangle');
    });

    it('updates multiple properties at once', () => {
      store.updateNode('node-1', { title: 'New Title', x: 50, y: 100 });

      expect(store.workflow.nodes['node-1'].title).toBe('New Title');
      expect(store.workflow.nodes['node-1'].x).toBe(50);
      expect(store.workflow.nodes['node-1'].y).toBe(100);
    });
  });

  describe('updateEdge', () => {
    it('updates an edge with partial data', () => {
      store.updateEdge('edge-1', { title: 'Updated Edge' });

      expect(store.workflow.edges['edge-1'].title).toBe('Updated Edge');
    });

    it('preserves other edge properties', () => {
      store.updateEdge('edge-1', { title: 'Updated Edge' });

      expect(store.workflow.edges['edge-1'].id).toBe('edge-1');
      expect(store.workflow.edges['edge-1'].from).toBe('node-1');
      expect(store.workflow.edges['edge-1'].to).toBe('node-2');
      expect(store.workflow.edges['edge-1'].fromSide).toBe('right');
      expect(store.workflow.edges['edge-1'].toSide).toBe('left');
    });

    it('updates multiple properties at once', () => {
      store.updateEdge('edge-1', {
        title: 'New Title',
        fromSide: 'bottom',
        toSide: 'top',
      });

      expect(store.workflow.edges['edge-1'].title).toBe('New Title');
      expect(store.workflow.edges['edge-1'].fromSide).toBe('bottom');
      expect(store.workflow.edges['edge-1'].toSide).toBe('top');
    });
  });
});
