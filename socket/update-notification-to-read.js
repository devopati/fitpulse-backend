import Notification from "../models/Notification.js";

export const updateNotificationToRead = (socket) => {
  socket.on("markNotificationAsRead", async (data) => {
    const { notificationId } = data;
    await Notification.findByIdAndUpdate(notificationId, { isRead: true });
  });
};
