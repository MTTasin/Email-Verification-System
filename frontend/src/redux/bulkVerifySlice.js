import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../API/ApiClient';

export const uploadBulkFile = createAsyncThunk(
  'bulkVerify/uploadFile',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiClient.post(`/api/verify/bulk/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBulkResults = createAsyncThunk(
  'bulkVerify/fetchResults',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/api/results/bulk/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bulkVerifySlice = createSlice({
  name: 'bulkVerify',
  initialState: {
    jobs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadBulkFile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadBulkFile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs.unshift(action.payload);
      })
      .addCase(uploadBulkFile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchBulkResults.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBulkResults.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
      })
      .addCase(fetchBulkResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default bulkVerifySlice.reducer;
