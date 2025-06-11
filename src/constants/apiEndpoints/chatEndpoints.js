const chatEndpoints = {
  GET_MESSAGES: (userId, contactId) => `/messages/${userId}/${contactId}`,
  SEND_MESSAGE: '/messages',
};

export default chatEndpoints;
