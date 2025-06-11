import api from '../client';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const fetchMessages = (userId, contactId) =>
  api
    .get(apiEndpoints.chat.GET_MESSAGES(userId, contactId))
    .then((response) => {
      console.log('Response from API:', response);
      return response.data || [];
    })
    .catch((error) => {
      console.error('API Error:', error);
      throw error;
    });

export const sendMessage = (messageData) =>
  api.post(apiEndpoints.chat.SEND_MESSAGE, messageData);
