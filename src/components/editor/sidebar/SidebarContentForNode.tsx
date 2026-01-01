import { type Accessor, type Component, createMemo } from 'solid-js';
import { useSelectionContext, useWorkflowContext } from '../../../stores';
import type { Selection } from '../../../types';
import DeleteButton from './DeleteButton';

const SidebarContentForNode: Component<{
  selection: Accessor<Selection>;
}> = ({ selection }) => {
  const { workflow, updateNode, deleteNode } = useWorkflowContext();
  const { setSelection } = useSelectionContext();
  const node = createMemo(() => {
    return workflow.nodes[selection().id];
  });

  return (
    <>
      <h2 class="mb-4 border-gray-200 border-b pb-4 font-semibold text-xl">
        Node
      </h2>
      <div class="mb-4 grid gap-3 border-gray-200 border-b pb-4 text-[0.9rem]">
        <label>
          <span>Title</span>
          <textarea
            rows={2}
            value={node().title}
            autofocus
            class="overflow-hidden rounded border border-gray-200"
            on:input={(e) =>
              updateNode(node().id, { title: e.target.value || '' })
            }
          ></textarea>
        </label>
        <label>
          <span>Width</span>
          <input
            type="number"
            value={node().width}
            class="overflow-hidden rounded border border-gray-200"
            on:input={(e) =>
              updateNode(node().id, { width: Number(e.target.value) })
            }
          ></input>
        </label>
        <label>
          <span>Height</span>
          <input
            type="number"
            value={node().height}
            class="overflow-hidden rounded border border-gray-200"
            on:input={(e) =>
              updateNode(node().id, { height: Number(e.target.value) })
            }
          ></input>
        </label>
      </div>
      <div class="mt-4 grid">
        <DeleteButton
          onDelete={() => {
            setSelection();
            deleteNode(node().id);
          }}
        />
      </div>
    </>
  );
};

export default SidebarContentForNode;
