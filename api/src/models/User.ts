import mongoose, { Document, Schema } from "mongoose";

export type UserDocument = Document & {
  profileId: mongoose.Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  lastLogin: Date;
  avatar: string;

  // more fields as needed
};

const UserSchema = new Schema<UserDocument>(
  {
    // type from database
    profileId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    lastLogin: { type: Date, default: null },
    avatar: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
