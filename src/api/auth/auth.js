import api from '../client';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const registerUser = (data) => api.post(apiEndpoints.REGISTER, data);
export const loginUser = (credentials) =>
  api.post(apiEndpoints.LOGIN, credentials);
export const activateAccount = (token) =>
  api.get(`${apiEndpoints.ACTIVATE}/${token}`);
export const requestPasswordReset = (email) =>
  api.post(apiEndpoints.REQUEST_RESET, { email });
export const resetPassword = (token, passwords) =>
  api.post(`${apiEndpoints.RESET_PASSWORD}/${token}`, passwords);
export const refreshToken = () => api.post(apiEndpoints.REFRESH_TOKEN);
