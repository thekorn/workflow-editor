import type { Component } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import type { ShapeProps } from './types';

const Ellipse: Component<ShapeProps> = (props) => {
  const { width, height } = props;
  return (
    <svg
      class={twMerge(
        'absolute top-0 left-0 w-full h-full overflow-visible stroke-gray-300 stroke-2 fill-white -z-10',
        props.class,
      )}
    >
      <title>background</title>
      <ellipse cx={width / 2} cy={height / 2} rx={width / 2} ry={height / 2} />
    </svg>
  );
};

export default Ellipse;
