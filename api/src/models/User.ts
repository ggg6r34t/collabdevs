import mongoose, { Document, Schema } from "mongoose";

export type UserDocument = Document & {
  twitterId: string;
  githubId: string;
  googleId: string;
  firstName: string;
  lastName: string;
  userName: string;
  headline: string;
  bio: string;
  email: string;
  password?: string;
  lastLogin: Date;
  role: string;
  isBanned: boolean;
  avatar: string;
  banner: string;
  resetToken: string | null;
  resetTokenExpiration: Date | null;
  rememberMe: boolean;
  socialLinks: {
    twitter: string | null;
    github: string | null;
    linkedin: string | null;
  };

  // more fields as needed
};
export enum Role {
  user = "user",
  admin = "admin",
}
const UserSchema = new Schema<UserDocument>(
  {
    // type from database
    twitterId: { type: String, default: null },
    githubId: { type: String, default: null },
    googleId: { type: String, default: null },
    firstName: { type: String },
    lastName: { type: String },
    userName: {
      type: String,
      unique: true,
      // required: true
    },
    headline: { type: String },
    bio: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    lastLogin: { type: Date, default: null },
    role: { type: String, enum: Role, default: Role.user, required: true },
    isBanned: { type: Boolean, default: false },
    avatar: {
      type: String,
      default:
        "https://e7.pngegg.com/pngimages/973/940/png-clipart-laptop-computer-icons-user-programmer-laptop-electronics-computer-thumbnail.png",
    },
    banner: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    },
    resetToken: { type: String, default: null },
    resetTokenExpiration: { type: Date, default: null },
    rememberMe: { type: Boolean, default: false },
    socialLinks: {
      twitter: { type: String, default: null },
      github: { type: String, default: null },
      linkedin: { type: String, default: null },
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
