import type { Component } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import type { ShapeProps } from './types';

const Pill: Component<ShapeProps> = (props) => {
  const { width, height } = props;
  const r = Math.max(width / 5, height / 5);
  return (
    <svg
      class={twMerge(
        'absolute top-0 left-0 w-full h-full overflow-visible stroke-gray-300 stroke-2 fill-white -z-10',
        props.class,
      )}
    >
      <title>background</title>
      <rect x={0} y={0} width={width} height={height} ry={r} rx={r} />
    </svg>
  );
};

export default Pill;
