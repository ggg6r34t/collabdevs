import Notification, { NotificationDocument } from "../models/Notification";

export const createNotificationService = async (
  notification: NotificationDocument
): Promise<NotificationDocument> => {
  return await notification.save();
};
