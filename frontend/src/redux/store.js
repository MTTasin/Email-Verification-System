import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import dashboardReducer from './dashboardSlice';
import apiKeyReducer from './apiKeySlice';
import billingReducer from './billingSlice';
import singleVerifyReducer from './singleVerifySlice';
import bulkVerifyReducer from './bulkVerifySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    apiKeys: apiKeyReducer,
    billing: billingReducer,
    singleVerify: singleVerifyReducer,
    bulkVerify: bulkVerifyReducer,
  },
});

export default store;
