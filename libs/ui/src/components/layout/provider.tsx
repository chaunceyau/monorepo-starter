import React from 'react';
import {LayoutContext as ILayoutContext} from './types';

const LayoutContext = React.createContext<ILayoutContext>({
  primaryNavigationLinks: [],
  accountPageNavigationLinks: [],
  profileDropdownNavigationLinks: [],
});

export function useLocationContext() {
  const ctx = React.useContext(LayoutContext);
  return ctx;
}

export function LayoutProvider(
  props: React.PropsWithChildren<{value: ILayoutContext}>
) {
  return (
    <LayoutContext.Provider value={props.value}>
      {props.children}
    </LayoutContext.Provider>
  );
}
