import api from '../client';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const registerUser = (data) =>
  api.post(apiEndpoints.auth.REGISTER, data);
export const loginUser = (credentials) =>
  api.post(apiEndpoints.auth.LOGIN, credentials);
export const activateAccount = (token) =>
  api.get(`${apiEndpoints.auth.ACTIVATE}/${token}`);
export const requestPasswordReset = (email) =>
  api.post(apiEndpoints.auth.REQUEST_RESET, { email });
export const resetPassword = (token, passwords) =>
  api.post(`${apiEndpoints.auth.RESET_PASSWORD}/${token}`, passwords);
export const refreshToken = () => api.post(apiEndpoints.auth.REFRESH_TOKEN);
export const logoutUser = () =>
  api.post(apiEndpoints.auth.LOGOUT, {}, { withCredentials: true });
export const verifyUser = () => api.get(apiEndpoints.auth.VERIFY);
