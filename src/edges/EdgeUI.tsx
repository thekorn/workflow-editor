import { type Accessor, type Component, createMemo, Show } from 'solid-js';
import type { Selection, Vec } from '../types';

const EdgeUI: Component<{
  id?: string;
  from: Accessor<Vec>;
  to: Accessor<Vec>;
  selection: Accessor<Selection | undefined>;
  connected?: boolean;
  title?: Accessor<string | undefined>;
}> = ({ id, from, to, selection, connected, title }) => {
  const pathDef = createMemo(
    () => `M ${from().x} ${from().y} L ${to().x} ${to().y}`,
  );
  const isSelected = createMemo(() => {
    const s = selection();
    return s && s.type === 'edge' && s.id === id;
  });

  const getCurrentTitle = createMemo(() => {
    return title?.();
  });

  const pathId = `edge_path_${id}`;

  return (
    <g
      id={id}
      data-edge
      classList={{
        'cursor-pointer': connected,
      }}
    >
      <path
        class="stroke-blue-500"
        classList={{ 'stroke-1': !isSelected(), 'stroke-2': isSelected() }}
        d={pathDef()}
        marker-end="url(#arrowHead)"
        id={pathId}
      />
      <path class="stroke-[25px] stroke-transparent" d={pathDef()} />
      <Show when={getCurrentTitle()}>
        {(t) => (
          <text dy={-5}>
            <textPath href={`#${pathId}`} startOffset={10} text-anchor="start">
              {t()}
            </textPath>
          </text>
        )}
      </Show>
    </g>
  );
};

export default EdgeUI;
