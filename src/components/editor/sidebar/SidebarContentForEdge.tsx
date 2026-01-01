import { type Accessor, type Component, createMemo } from 'solid-js';
import { useSelectionContext, useWorkflowContext } from '@/stores';
import type { Selection } from '@/types';
import DeleteButton from './DeleteButton';

const SidebarContentForEdge: Component<{
  selection: Accessor<Selection>;
}> = ({ selection }) => {
  const { workflow, updateEdge, deleteEdge } = useWorkflowContext();
  const { setSelection } = useSelectionContext();
  const edge = createMemo(() => {
    return workflow.edges[selection().id];
  });

  return (
    <>
      <h2 class="mb-4 border-gray-200 border-b pb-4 font-semibold text-xl">
        Edge
      </h2>
      <div class="mb-4 grid gap-3 border-gray-200 border-b pb-4 text-[0.9rem]">
        <label>
          <span>Title</span>
          <textarea
            rows={2}
            value={edge().title}
            autofocus
            class="overflow-hidden rounded border border-gray-200"
            on:input={(e) =>
              updateEdge(edge().id, { title: e.target.value || '' })
            }
          ></textarea>
        </label>
      </div>
      <div class="mt-4 grid">
        <DeleteButton
          onDelete={() => {
            setSelection();
            deleteEdge(edge().id);
          }}
        />
      </div>
    </>
  );
};

export default SidebarContentForEdge;
