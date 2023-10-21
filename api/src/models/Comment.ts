import mongoose, { Document, Schema } from "mongoose";

export type CommentDocument = Document & {
  postId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userName: string;
  content: string;
   createdAt: Date;
  updatedAt: Date;
};

const commentSchema = new Schema<CommentDocument>(
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
    userName: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);

export default Comment;
