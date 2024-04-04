import { updateNotificationToRead } from "./update-notification-to-read.js";

let socketExport;
export const socketsHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");
    socketExport = socket;
    updateNotificationToRead(socket);
  });
};

export const getSocket = () => {
  return socketExport;
};
