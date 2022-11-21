import { configureStore } from '@reduxjs/toolkit';
import dogFormReducer from './form/dogFormSlice';

export default configureStore({
  reducer: {
    dogForm: dogFormReducer
  }
});
