import { type Component, For } from 'solid-js';
import type { IconProps, NodeTemplate } from '../types';

const TemplateToolbar: Component<{
  nodeTemplates: NodeTemplate[];
  Icon: Component<IconProps>;
}> = ({ nodeTemplates, Icon }) => {
  return (
    <div class="absolute max-w-24 left-4 top-24 rounded-xl overflow-hidden border-2 border-gray-300 bg-white z-10 justify-center flex-col items-center content-center divide-y-2 divide-gray-300">
      <For each={nodeTemplates}>
        {(nodeTemplate) => (
          <div
            class="p-3 text-center text-xs cursor-move transition-all duration-100 ease-in hover:bg-gray-100"
            data-template-id={nodeTemplate.id}
          >
            <Icon
              name={nodeTemplate.icon}
              size={25}
              class="overflow-visible justify-self-center mb-2"
            />
            {nodeTemplate.title}
          </div>
        )}
      </For>
    </div>
  );
};

export default TemplateToolbar;
