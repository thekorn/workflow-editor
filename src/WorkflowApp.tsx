import type { Component } from 'solid-js';
import { DragProvider, SelectionProvider, WorkflowProvider } from '@/stores';
import type { NodeTemplate, Workflow } from '@/types';
import Icon from './components/editor/Icon';
import WorkflowEditor from './components/editor/WorkflowEditor';

const WorkflowApp: Component<{
  workflow?: Workflow;
  templates: NodeTemplate[];
}> = ({ workflow, templates }) => {
  return (
    <WorkflowProvider workflow={workflow ?? { nodes: {}, edges: {} }}>
      <DragProvider>
        <SelectionProvider>
          <WorkflowEditor nodeTemplates={templates} Icon={Icon} />
        </SelectionProvider>
      </DragProvider>
    </WorkflowProvider>
  );
};

export default WorkflowApp;
