import mongoose, { Document, Schema } from "mongoose";

export type UserDocument = Document & {
  //profileId: mongoose.Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  lastLogin: Date;
  role: string;
  isBanned: boolean;
  avatar: string;
  banner: string;

  // more fields as needed
};
export enum Role {
  user = "user",
  admin = "admin",
}
const UserSchema = new Schema<UserDocument>(
  {
    // type from database
    //profileId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: {
      type: String,
      unique: true,
      // required: true
    },
    email: { type: String, unique: true, required: true },
    password: {
      type: String,
      //required: true
    },
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
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
