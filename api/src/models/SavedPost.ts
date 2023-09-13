import mongoose, { Document, Schema } from "mongoose";

export type SavedPostsDocument = Document & {
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  savedAt: Date;
};

const savedPostsSchema = new Schema<SavedPostsDocument>({
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

const SavedPosts = mongoose.model<SavedPostsDocument>(
  "SavedPosts",
  savedPostsSchema
);

export default SavedPosts;
