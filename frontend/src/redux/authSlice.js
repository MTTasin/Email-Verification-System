import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../API/ApiClient';

export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get('/api/user/profile/');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('access_token') || null,
    isAuthenticated: !!localStorage.getItem('access_token'),
    status: 'idle',
    error: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.access;
      localStorage.setItem('access_token', action.payload.access);
      localStorage.setItem('refresh_token', action.payload.refresh);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
    setUser(state, action) {
        state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      });
  },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
