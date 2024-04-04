import User from "../models/User.js";

export const removeUserNotificationPushToken = async (pushToken) => {
  try {
    if (!pushToken) return;
    await User.findOneAndUpdate(
      { pushNotificationsToken: pushToken },
      { pushNotificationsToken: "" }
    );
  } catch (error) {
    console.error(error);
  }
};
