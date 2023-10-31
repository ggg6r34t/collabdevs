import mongoose, { Document, Schema } from "mongoose";

export type SavedPostDocument = Document & {
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  savedAt: Date;
};

const savedPostSchema = new Schema<SavedPostDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

const SavedPost = mongoose.model<SavedPostDocument>(
  "SavedPost",
  savedPostSchema
);

export default SavedPost;
