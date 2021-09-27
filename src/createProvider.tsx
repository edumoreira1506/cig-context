import React, { useMemo, useReducer, ReactNode } from 'react';
import { Context } from 'use-context-selector';

export default function createProvider<T, I, J>(context: Context<J>, initialState: T, reducer: (state: T, action: I) => T) {
  return ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const store = useMemo(() => ({ ...state, dispatch }) as any, [state]);
  
    return <context.Provider value={store}>{children}</context.Provider>;
  };
}
