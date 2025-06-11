// src/utils/socket.js
import { io } from 'socket.io-client';

let socket = null;

export const initSocket = (token) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', {
      auth: {
        token,
      },
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });
  }
  return socket;
};

export const getSocket = () => socket;
