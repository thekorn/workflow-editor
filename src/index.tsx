/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import 'solid-devtools';
import { attachDevtoolsOverlay } from '@solid-devtools/overlay';
import { WorkflowEditor } from './editor';
import type { Workflow } from './types';

attachDevtoolsOverlay();

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const EXAMPLE_WORKFLOW: Workflow = {
  nodes: {
    'node-1': {
      id: 'node-1',
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      title: 'Node 1 rectangle',
      shape: 'rectangle',
    },
    'node-2': {
      id: 'node-2',
      x: 300,
      y: 200,
      width: 150,
      height: 100,
      title: 'Node 2 ellipse',
      shape: 'ellipse',
    },
    'node-3': {
      id: 'node-3',
      x: 500,
      y: 100,
      width: 200,
      height: 100,
      title: 'Node 3 pill',
      shape: 'pill',
    },
    'node-4': {
      id: 'node-4',
      x: 500,
      y: 400,
      width: 200,
      height: 200,
      title: 'Node 4 diamond',
      shape: 'diamond',
    },
  },
  edges: {
    'edge-1': {
      id: 'edge-1',
      from: 'node-1',
      to: 'node-2',
      fromSide: 'right',
      toSide: 'left',
      title: 'Edge 1',
    },
    // 'edge-2': {
    //   id: 'edge-2',
    //   from: 'node-2',
    //   to: 'node-3',
    //   fromSide: 'right',
    //   toSide: 'left',
    //   title: 'Edge 2',
    // },
  },
} as const;

// biome-ignore lint/style/noNonNullAssertion: we know its there
render(() => <WorkflowEditor workflowConfig={EXAMPLE_WORKFLOW} />, root!);
