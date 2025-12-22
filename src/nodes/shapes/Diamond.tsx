import type { Component } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import type { ShapeProps } from './types';

const Diamond: Component<ShapeProps> = (props) => {
  const { width, height } = props;
  return (
    <svg
      class={twMerge(
        'absolute top-0 left-0 w-full h-full overflow-visible stroke-gray-300 stroke-2 fill-white -z-10',
        props.class,
      )}
    >
      <title>background</title>
      <polygon
        points={`${width / 2},0 ${width}, ${height / 2} ${width / 2}, ${height} 0, ${height / 2}`}
      />
    </svg>
  );
};

export default Diamond;
