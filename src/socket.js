import { io } from "socket.io-client";

export const socket = io("https://elchat-app-backend.onrender.com", {
  autoConnect: false,
});
