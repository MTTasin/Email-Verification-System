import { configureStore } from 'https://cdn.skypack.dev/@reduxjs/toolkit';
import authReducer from './AuthSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // You can add other reducers here for different parts of your app
  },
});

