import * as React from 'react';
import { Context } from 'use-context-selector';

export default function createProvider<T, I, J>(context: Context<J>, initialState: T, reducer: (state: T, action: I) => T) {
  return ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const store = React.useMemo(() => ({ ...state, dispatch }) as any, [state]);
  
    return <context.Provider value={store}>{children}</context.Provider>;
  };
}
