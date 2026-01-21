import { io } from "socket.io-client";
import * as dotenv from "dotenv";
dotenv.config();

export const socket = io(process.env.SOCKET_URL, {
  autoConnect: false,
});
