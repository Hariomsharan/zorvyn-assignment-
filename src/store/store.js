// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { financeApi } from './apiSlice';
import financeReducer from './financeSlice';

export const store = configureStore({
  reducer: {
    finance: financeReducer,
    [financeApi.reducerPath]: financeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(financeApi.middleware),
});