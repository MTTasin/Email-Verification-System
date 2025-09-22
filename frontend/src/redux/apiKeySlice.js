import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../API/ApiClient';

export const fetchApiKeys = createAsyncThunk(
  'apiKeys/fetchApiKeys',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/api/keys/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createApiKey = createAsyncThunk(
  'apiKeys/createApiKey',
  async (name, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/api/keys/', { name });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const revokeApiKey = createAsyncThunk(
  'apiKeys/revokeApiKey',
  async (id, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/api/keys/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const apiKeySlice = createSlice({
  name: 'apiKeys',
  initialState: {
    keys: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiKeys.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApiKeys.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.keys = action.payload;
      })
      .addCase(fetchApiKeys.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createApiKey.fulfilled, (state, action) => {
        state.keys.push(action.payload);
      })
      .addCase(revokeApiKey.fulfilled, (state, action) => {
        state.keys = state.keys.filter((key) => key.id !== action.payload);
      });
  },
});

export default apiKeySlice.reducer;
