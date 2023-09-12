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
    firstName: { type: String, 
      required: true
     },
    lastName: { type: String, 
     required: true
     },
    userName: { type: String, unique: true,
      // required: true
     },
    email: { type: String, unique: true, required: true },
    password: { type: String,
       //required: true
       },
    lastLogin: { type: Date, default: null },
    role: { type: String, enum: Role, default: Role.user, required: true },
    isBanned: { type: Boolean, default: false },
    avatar: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
