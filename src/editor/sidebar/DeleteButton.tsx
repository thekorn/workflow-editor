import type { ParentComponent } from 'solid-js';

const DeleteButton: ParentComponent<{ onDelete: () => void }> = (props) => {
  return (
    <button
      class="flex items-center justify-center gap-1 rounded border bg-red-700 p-2 px-2 py-1 text-white transition duration-100 ease-in hover:border-gray-400 focus:border-gray-400 active:border-gray-400 active:shadow"
      type="button"
      on:click={props.onDelete}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
