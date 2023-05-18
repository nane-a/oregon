import * as socketIO from "socket.io-client";

export const socket = socketIO.connect("http://localhost:5000")