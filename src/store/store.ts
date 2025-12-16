import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/services/baseApi';

import authReducer from './reducers/authSlice';
import todoReducer from './reducers/todoSlice';

const rootReducer = combineReducers({
   [baseApi.reducerPath]: baseApi.reducer,
   todoReducer,
   authReducer,
});

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
