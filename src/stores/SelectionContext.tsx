import {
  createContext,
  createSignal,
  type ParentComponent,
  useContext,
} from 'solid-js';
import type { Selection } from '@/types';

type SelectionContextValue = {
  selection: ReturnType<typeof createSignal<Selection | undefined>>[0];
  setSelection: ReturnType<typeof createSignal<Selection | undefined>>[1];
};

const SelectionContext = createContext<SelectionContextValue>();

export const SelectionProvider: ParentComponent = (props) => {
  const [selection, setSelection] = createSignal<Selection | undefined>();

  return (
    <SelectionContext.Provider value={{ selection, setSelection }}>
      {props.children}
    </SelectionContext.Provider>
  );
};

export function useSelectionContext() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error(
      'useSelectionContext should be called inside its ContextProvider',
    );
  }
  return context;
}
