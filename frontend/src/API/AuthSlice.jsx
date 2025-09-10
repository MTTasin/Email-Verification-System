import { createSlice, createAsyncThunk } from 'https://cdn.skypack.dev/@reduxjs/toolkit';
import apiClient from './ApiClient.jsx';

// --- Mock User Data ---
const mockUser = {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    credits: 4350,
    apiKey: 'sk_live_xxxxxxxxxxxxxxxxx1234',
    plan: 'Pro Plan',
};

// --- Async Thunk for Login ---
// In a real app, this would make a POST request to your '/login' endpoint
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate success/failure
      if (email === 'test@example.com' && password === 'password') {
        // On success, return the user and a mock token
        return { user: mockUser, token: 'fake-jwt-token' };
      } else {
        // On failure, return a custom error message
        return rejectWithValue('Invalid email or password');
      }
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);


// --- Auth Slice Definition ---
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  // Handle async actions from the thunk
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
