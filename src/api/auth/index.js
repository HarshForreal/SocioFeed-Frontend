import api from '../client';
import { apiEndpoints } from '../../constants/apiEndpoints';

// Register User
export const registerUser = (data) =>
  api.post(apiEndpoints.auth.REGISTER, data);
// Login User
export const loginUser = (credentials) =>
  api.post(apiEndpoints.auth.LOGIN, credentials);
// Activate account
export const activateAccount = (token) =>
  api.get(`${apiEndpoints.auth.ACTIVATE}/${token}`);
// Request Reset Password
export const requestPasswordReset = (email) =>
  api.post(apiEndpoints.auth.REQUEST_RESET, { email });
// Reset Password
export const resetPassword = (token, passwords) =>
  api.post(`${apiEndpoints.auth.RESET_PASSWORD}/${token}`, passwords);
// Refresh Token
export const refreshToken = () => api.post(apiEndpoints.auth.REFRESH_TOKEN);
// Logout
export const logoutUser = () =>
  api.post(apiEndpoints.auth.LOGOUT, {}, { withCredentials: true });
// VERIFY USER
export const verifyUser = () => api.get(apiEndpoints.auth.VERIFY);
