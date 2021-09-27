import { Dispatch } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import { ApiErrorType } from '@cig-platform/types';

import createProvider from './createProvider';

export const DEFAULT_STATE = {
  isLoading: false,
  error: null,
};

export interface DefaultState {
  isLoading?: boolean;
  error?: null | ApiErrorType;
}

export default function createReducableContext<T, I>(initialState: T, reducer: React.ReducerWithoutAction<any>) {
  type IContext = DefaultState & T & {
    dispatch: Dispatch<I>;
  }

  const context = createContext<IContext>({ ...DEFAULT_STATE, ...initialState, dispatch: () => null });

  const useDispatch = () => {
    const dispatch = useContextSelector(context, state => state.dispatch);
  
    return dispatch;
  };

  const useSelector = <Selected>(selector: (state: IContext) => Selected) => useContextSelector(context, selector);

  const provider = createProvider<T, IContext>(context, initialState, reducer);

  return { context, useDispatch, useSelector, provider };
}
