import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authSlice';
import todoReducer from './reducers/todoSlice';

const rootReducer = combineReducers({
   todoReducer,
   authReducer,
});

export const store = configureStore({
   reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
