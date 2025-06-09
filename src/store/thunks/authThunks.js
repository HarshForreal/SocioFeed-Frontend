import { createAsyncThunk } from '@reduxjs/toolkit';
import { verifyUser } from '../../api/auth';

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
