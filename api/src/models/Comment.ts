import mongoose, { Document, Schema } from "mongoose";

export type CommentDocument = Document & {
  text: string;
  link: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  createAt: Date;
};

const commentSchema = new Schema<CommentDocument>(
  {
    text: { type: String, required: true },
    link: { type: Schema.Types.ObjectId, ref: "Link" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);

export default Comment;
