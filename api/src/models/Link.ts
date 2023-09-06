import mongoose, { Document, Schema } from "mongoose";

export type LinkDocument = Document & {
  title: string;
  url: string;
  userId: mongoose.Types.ObjectId;
  voteScore: number;
};

const linkSchema = new Schema<LinkDocument>(
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

const Link = mongoose.model<LinkDocument>("Link", linkSchema);

export default Link;
