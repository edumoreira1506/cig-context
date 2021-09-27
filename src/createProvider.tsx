import React, { useMemo, useReducer, ReactNode } from 'react';
import { Context } from 'use-context-selector';

export default function createProvider<T, I>(context: Context<I>, initialState: T, reducer: React.ReducerWithoutAction<any>) {
  return ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const store = useMemo(() => ({ ...state, dispatch }), [state]);
  
    return <context.Provider value={store}>{children}</context.Provider>;
  };
}
