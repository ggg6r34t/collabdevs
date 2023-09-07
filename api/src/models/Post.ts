import mongoose, { Document, Schema } from "mongoose";

export type PostDocument = Document & {
  title: string;
  url: string;
  userId: mongoose.Types.ObjectId;
  voteScore: number;
};

const postSchema = new Schema<PostDocument>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    voteScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = mongoose.model<PostDocument>("Post", postSchema);

export default Post;
