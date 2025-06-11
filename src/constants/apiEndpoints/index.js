// constants/apiEndpoints/index.js
import authEndpoints from './authEndpoints';
import userEndpoints from './userEndpoints';
import postEndpoints from './postsEndpoints';
import chatEndpoints from './chatEndpoints';

export const apiEndpoints = {
  auth: authEndpoints,
  user: userEndpoints,
  post: postEndpoints,
  chat: chatEndpoints,
};
