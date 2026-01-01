import { type Component, createMemo, For } from 'solid-js';
import { useDragContext } from '@/stores';
import { type IconProps, isDragNode, type NodeTemplate } from '@/types';

const TemplateToolbar: Component<{
  nodeTemplates: NodeTemplate[];
  Icon: Component<IconProps>;
}> = ({ nodeTemplates, Icon }) => {
  const { drag } = useDragContext();
  const isNodeDrag = createMemo(() => {
    return isDragNode(drag());
  });
  return (
    <div
      classList={{ 'hover:opacity-0': isNodeDrag() }}
      class="absolute top-24 left-4 z-10 max-w-24 flex-col content-center items-center justify-center divide-y-2 divide-gray-300 overflow-hidden rounded-xl border-2 border-gray-300 bg-white transition-all duration-200 ease-in"
    >
      <For each={nodeTemplates}>
        {(nodeTemplate) => (
          <div
            class="cursor-move p-3 text-center text-xs transition-all duration-100 ease-in hover:bg-gray-100"
            data-template-id={nodeTemplate.id}
          >
            <Icon
              name={nodeTemplate.icon}
              size={25}
              class="mb-2 justify-self-center overflow-visible"
            />
            {nodeTemplate.title}
          </div>
        )}
      </For>
    </div>
  );
};

export default TemplateToolbar;
