// store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { verifySession } from '../thunks/authThunks';

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
