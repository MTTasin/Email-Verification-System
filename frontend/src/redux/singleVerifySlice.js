import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../API/ApiClient';

export const verifyEmail = createAsyncThunk(
  'singleVerify/verifyEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/api/verify/single/', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchVerificationResult = createAsyncThunk(
  'singleVerify/fetchResult',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/api/results/single/${taskId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const singleVerifySlice = createSlice({
  name: 'singleVerify',
  initialState: {
    result: null,
    status: 'idle',
    error: null,
    taskId: null,
  },
  reducers: {
    reset: (state) => {
        state.result = null;
        state.status = 'idle';
        state.error = null;
        state.taskId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.status = 'loading';
        state.result = null;
        state.error = null;
        state.taskId = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.status = 'polling';
        state.taskId = action.payload.task_id;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchVerificationResult.pending, (state) => {
        state.status = 'polling';
      })
      .addCase(fetchVerificationResult.fulfilled, (state, action) => {
        if (action.payload.status === 'PENDING') {
            state.status = 'polling';
        } else {
            state.status = 'succeeded';
            state.result = action.payload;
        }
      })
      .addCase(fetchVerificationResult.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { reset } = singleVerifySlice.actions;
export default singleVerifySlice.reducer;
