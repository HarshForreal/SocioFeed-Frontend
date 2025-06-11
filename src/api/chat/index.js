import api from '../client'; // Your existing API client
import { apiEndpoints } from '../../constants/apiEndpoints';

// Fetch messages between two users
export const fetchMessages = (userId, contactId) =>
  api
    .get(apiEndpoints.chat.GET_MESSAGES(userId, contactId))
    .then((response) => {
      console.log('Response from API:', response); // Debugging log to check API response
      return response.data || []; // Ensure we return only the data array, not the whole response
    })
    .catch((error) => {
      console.error('API Error:', error); // Log any API errors
      throw error; // Throw the error so that it can be handled by the calling function
    });

// Send a new message
export const sendMessage = (messageData) =>
  api.post(apiEndpoints.chat.SEND_MESSAGE, messageData);
