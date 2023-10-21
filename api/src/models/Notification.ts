import mongoose, { Document, Schema } from "mongoose";

export type NotificationDocument = Document & {
  postId: mongoose.Types.ObjectId;
  commentId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  //userName: mongoose.Types.ObjectId;
  content: string;
  notification: string;
  notificaitonType: string;
};

const notificationSchema = new Schema<NotificationDocument>(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // userName: { type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true, },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Notification = mongoose.model<NotificationDocument>("Notification", notificationSchema);

export default Notification;