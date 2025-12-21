import type { Component } from 'solid-js';
import type { Side } from '../types';

const Port: Component<{ side: Side }> = ({ side }) => {
  return (
    <div
      data-port
      data-side={side}
      class="absolute w-5 h-5 border-[3px] rounded-full group-hover:opacity-100 opacity-0"
      classList={{
        'bg-radial-[Circle_at_Center,var(--color-red-700)_3px,transparent_4px]': true,
        '-left-[13px]': side === 'left',
        '-right-[13px]': side === 'right',
        'top-[calc(50%_-13px)]': side === 'left' || side === 'right',
        '-top-[13px]': side === 'top',
        '-bottom-[13px]': side === 'bottom',
        'left-[calc(50%_-13px)]': side === 'top' || side === 'bottom',
      }}
    />
  );
};

export default Port;
