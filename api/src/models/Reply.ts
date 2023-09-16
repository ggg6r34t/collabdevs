import mongoose, { Document, Schema } from "mongoose";

export type ReplyDocument = Document & {
  postId: mongoose.Types.ObjectId;
  commentId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userName: string;
  content: string;
};

const replySchema = new Schema<ReplyDocument>(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Reply = mongoose.model<ReplyDocument>("Reply", replySchema);

export default Reply;
