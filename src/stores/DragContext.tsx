import {
  createContext,
  createSignal,
  type ParentComponent,
  useContext,
} from 'solid-js';
import type { Drag } from '@/types';

type DragContextValue = {
  drag: ReturnType<typeof createSignal<Drag | undefined>>[0];
  setDrag: ReturnType<typeof createSignal<Drag | undefined>>[1];
};

const DragContext = createContext<DragContextValue>();

export const DragProvider: ParentComponent = (props) => {
  const [drag, setDrag] = createSignal<Drag | undefined>();

  return (
    <DragContext.Provider value={{ drag, setDrag }}>
      {props.children}
    </DragContext.Provider>
  );
};

export function useDragContext() {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error(
      'useDragContext should be called inside its ContextProvider',
    );
  }
  return context;
}
