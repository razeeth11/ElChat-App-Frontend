import { io } from "socket.io-client";

// export const socket = io("https://elchat-app-backend.onrender.com", {
//   autoConnect: false,
// });

export const socket = io("http://localhost:9790", {
  autoConnect: false,
});
