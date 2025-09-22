import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../API/ApiClient';

export const fetchPlans = createAsyncThunk(
  'billing/fetchPlans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/api/billing/plans/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCheckoutSession = createAsyncThunk(
  'billing/createCheckoutSession',
  async (planId, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/api/billing/create-checkout-session/', { plan_id: planId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const billingSlice = createSlice({
  name: 'billing',
  initialState: {
    plans: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default billingSlice.reducer;
