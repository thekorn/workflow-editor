import { Crop, Droplet, FileInput, RotateCw, Sun } from 'lucide-solid';
import { type Component, Match, Switch, splitProps } from 'solid-js';
import type { IconProps } from '../types';

const Icon: Component<IconProps> = (props) => {
  const [local, others] = splitProps(props, ['name']);
  return (
    <Switch>
      <Match when={local.name === 'FileInput'}>
        <FileInput {...others} />
      </Match>
      <Match when={local.name === 'Sun'}>
        <Sun {...others} />
      </Match>
      <Match when={local.name === 'Crop'}>
        <Crop {...others} />
      </Match>
      <Match when={local.name === 'RotateCw'}>
        <RotateCw {...others} />
      </Match>
      <Match when={local.name === 'Droplet'}>
        <Droplet fill="currentColor" {...others} />
      </Match>
    </Switch>
  );
};

export default Icon;
