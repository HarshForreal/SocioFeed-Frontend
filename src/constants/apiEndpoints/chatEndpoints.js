const chatEndpoints = {
  GET_MESSAGES: (userId, contactId) => `/messages/${userId}/${contactId}`,
  SEND_MESSAGE: '/messages', // POST method to send messages
};

export default chatEndpoints;
