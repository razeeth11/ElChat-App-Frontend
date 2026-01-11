import { io } from "socket.io-client";

export const socket = io("http://localhost:9790", {
  autoConnect: false,
});
