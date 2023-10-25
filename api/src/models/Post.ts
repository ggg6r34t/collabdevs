import mongoose, { Document, Schema } from "mongoose";

export type PostDocument = Document & {
  title: string;
  content: string;
  url?: string;
  userId: mongoose.Types.ObjectId;
  userName: string;
  voteScore: number;
  shareCount: number;
  saveCount: number;
  commentCount: number;
  replyCount: number;
  upvotes: mongoose.Types.ObjectId[];
  downvotes: mongoose.Types.ObjectId[];
  shares: mongoose.Types.ObjectId[];
  saves: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  replies: mongoose.Types.ObjectId[];
  engagementScore: number;
  createdAt: Date;
  updatedAt: Date;
};

const postSchema = new Schema<PostDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    url: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: { type: String, required: true },
    voteScore: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    saveCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    replyCount: { type: Number, default: 0 },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    saves: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    engagementScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = mongoose.model<PostDocument>("Post", postSchema);

export default Post;
