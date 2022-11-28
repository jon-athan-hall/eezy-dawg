import { configureStore } from '@reduxjs/toolkit';
import dogFormReducer from './dog-form/dogFormSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    dogForm: dogFormReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * Export a hook that can be reused to resolve types.
 * https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
