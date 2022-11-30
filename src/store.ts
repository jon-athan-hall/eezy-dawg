import {
  combineReducers,
  configureStore,
  PreloadedState
} from '@reduxjs/toolkit';
import dogFormReducer from './dog-form/dogFormSlice';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
  dogForm: dogFormReducer
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

/**
 * Export a hook that can be reused to resolve types.
 * https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
