import { configureStore } from '@reduxjs/toolkit';
import dogFormReducer from './dog-form/dogFormSlice';

export const store = configureStore({
  reducer: {
    dogForm: dogFormReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

