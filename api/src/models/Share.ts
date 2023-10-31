import mongoose, { Document, Schema } from "mongoose";

export type ShareDocument = Document & {
  post: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const shareSchema = new Schema<ShareDocument>(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Share = mongoose.model<ShareDocument>("Share", shareSchema);

export default Share;
