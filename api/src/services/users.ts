import dotenv from "dotenv";

import {
  AlreadyExist,
  InternalServerError,
  NotFoundError,
} from "../helpers/apiError";
import User, { UserDocument } from "../models/User";
import createTransporter from "../utils/createTransporter";
import mongoose from "mongoose";

dotenv.config();
const SMTP_EMAIL = process.env.SMTP_EMAIL as string;

// Create a new user with validation
export const createUserService = async (
  newUser: UserDocument
): Promise<UserDocument> => {
  try {
    const existingUser = await User.findOne({ email: newUser.email });
    if (existingUser) {
      throw new AlreadyExist(`User with ${newUser.email} already exists`);
    }

    return await newUser.save();
  } catch (error) {
    throw error;
  }
};

// Find a user by email
export const findUserByEmailService = async (
  email: string
): Promise<UserDocument> => {
  try {
    const foundUser = await User.findOne({ email, isBanned: false });
    if (!foundUser) {
      throw new NotFoundError(`User with ${email} not found`);
    }
    return foundUser;
  } catch (error) {
    throw error;
  }
};

// find a user by token
export const findUserByTokenService = async (
  token: string,
  field: string, // field to search (e.g., 'emailConfirmationToken' or 'resetToken')
  errorMessage: string // error message for the NotFoundError
) => {
  try {
    const user = await User.findOne({ [field]: token }).exec();
    if (!user) {
      throw new NotFoundError(errorMessage);
    }
    return user;
  } catch (error) {
    throw error;
  }
};

// get a user by ID (excluding password)
export const getUserByIdService = async (
  userId: string
): Promise<UserDocument> => {
  try {
    const userById = await User.findById(userId).select("-password");
    if (!userById) {
      throw new NotFoundError(`No user found with ID ${userId}`);
    }
    return userById;
  } catch (error) {
    throw error;
  }
};

// get a list of all users
export const getUserListService = async (): Promise<UserDocument[]> => {
  try {
    const userList = await User.find().exec();

    if (!userList || userList.length === 0) {
      throw new NotFoundError(`Users not found`);
    }

    return userList;
  } catch (error) {
    throw error;
  }
};

// update user information by ID
export const updateUserByIdService = async (
  userId: string,
  updateUserInformation: Partial<UserDocument>
): Promise<UserDocument> => {
  try {
    const userById = await User.findByIdAndUpdate(
      userId,
      updateUserInformation,
      {
        new: true,
      }
    );
    if (!userById) {
      throw new NotFoundError(`No user found with ID ${userId}`);
    }
    return userById;
  } catch (error) {
    throw error;
  }
};

// save media upload (user avatar/banner)
export const uploadMediaService = async (
  userId: string,
  mediaType: string,
  mediaData: string | undefined
): Promise<UserDocument> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError(`User with ID ${userId} not found`);
    }

    if (mediaData !== undefined) {
      if (mediaType === "avatar" || mediaType === "banner") {
        user[mediaType] = mediaData;
      } else {
        throw new Error(`Invalid mediaType: ${mediaType}`);
      }
    }

    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

// update user role (admin/user)
export const updateRoleService = async (
  userId: string
): Promise<UserDocument> => {
  try {
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      throw new NotFoundError(`User not found with ID ${userId}`);
    }

    if (foundUser.role === "admin") {
      foundUser.role = "user";
    } else {
      if (foundUser.isBanned === true) {
        foundUser.role = "user";
      } else {
        foundUser.role = "admin";
      }
    }

    const updatedUser = await updateUserByIdService(userId, foundUser);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// update user restriction (ban/unban)
export const updateRestrictionService = async (
  userId: string
): Promise<UserDocument> => {
  try {
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      throw new NotFoundError(`User not found with ID ${userId}`);
    }

    foundUser.isBanned = !foundUser.isBanned;

    const updatedUser = await updateUserByIdService(userId, foundUser);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// delete a user by ID
export const deleteUserByIdService = async (
  userId: string
): Promise<UserDocument> => {
  try {
    const userById = await User.findByIdAndDelete(userId);
    if (!userById) {
      throw new NotFoundError(`No user found with ID ${userId}`);
    }
    return userById;
  } catch (error) {
    throw error;
  }
};

// find or create user based on authentication provider
export const findOrCreateUserService = async (
  provider: "twitter" | "github" | "google",
  payload: Partial<UserDocument>
): Promise<UserDocument> => {
  try {
    const query = { [`${provider}Id`]: payload[`${provider}Id`] };
    const user = await User.findOne(query);

    if (user) {
      return user; // user already exists
    } else {
      const newUser = new User({
        [`${provider}Id`]: payload[`${provider}Id`],
        email: payload.email,
        userName: payload.userName,
        firstName: payload.firstName,
        lastName: payload.lastName,
        avatar: payload.avatar,
      });

      const savedUser = await newUser.save();
      return savedUser; // new user created
    }
  } catch (error) {
    console.error("Error creating account:", error);
    throw new InternalServerError(
      "An error occurred while creating the account."
    );
  }
};

// send a confirmation email with a confirmation token
export const sendConfirmEmailService = async (
  email: string,
  confirmEmailToken: string
): Promise<void> => {
  try {
    const transporter = await createTransporter(); // creates the Nodemailer transporter

    const mailOptions = {
      from: `"CollabDev" <${SMTP_EMAIL}>`,
      to: email,
      subject: "Email Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #0078d4;">Email Confirmation</h2>
          <p>Dear user,</p>
          <p>Thank you for signing up. To confirm your email, click the button below:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="https://bucolic-12d61d.netlify.app/auth/confirm-email/${confirmEmailToken}" style="background-color: #010536; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirm Email</a>
          </div>
          <p>If you didn't sign up for an account, you can safely ignore this email.</p>
          <p>This link will expire in 1 hour for security reasons.</p>
          <p>If you encounter any issues, please contact our support team at <a href="mailto:support@collabdev.com">support@collabdev.com</a>.</p>
          <p>With ❤️,<br><br>The Collaborative DevLink Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};
