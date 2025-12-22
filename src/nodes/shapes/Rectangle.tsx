import type { Component } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import type { ShapeProps } from './types';

const Rectangle: Component<ShapeProps> = (props) => {
  const { width, height } = props;

  return (
    <svg
      class={twMerge(
        'absolute top-0 left-0 w-full h-full overflow-visible stroke-gray-300 stroke-2 fill-white -z-10',
        props.class,
      )}
    >
      <title>background</title>
      <rect x={0} y={0} width={width} height={height} ry={5} rx={5} />
    </svg>
  );
};

export default Rectangle;
