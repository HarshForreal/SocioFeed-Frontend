import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { verifyUser } from '../../api/auth/auth';
export const verifySession = createAsyncThunk(
  'auth/verifySession',
  async (_, { rejectWithValue }) => {
    try {
      const res = await verifyUser();
      return res.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: 'Session verification failed' }
      );
    }
  }
);

const initialState = {
  isLoggedIn: false,
  user: null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      console.log('Redux setIsLoggedIn →', action.payload);
      state.isLoggedIn = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    clearAuth(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifySession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifySession.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(verifySession.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.loading = false;
      });
  },
});

export const { setIsLoggedIn, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
