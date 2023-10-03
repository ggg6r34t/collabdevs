import { NotFoundError } from "../helpers/apiError";
import User, { UserDocument } from "../models/User";

// save reset token and expiration
export const saveResetTokenService = async (
  userId: string,
  resetToken: string,
  resetTokenExpiration: Date
): Promise<UserDocument> => {
  try {
    const userById = await User.findByIdAndUpdate(userId, {
      resetToken,
      resetTokenExpiration,
    });
    if (!userById) {
      throw new NotFoundError(`No user found with ID ${userId}`);
    }
    return userById;
  } catch (error) {
    throw error;
  }
};

// update the last login timestamp
export const updateLastLoginService = async (
  id: string
): Promise<UserDocument> => {
  try {
    const foundUser = await User.findByIdAndUpdate(id, {
      lastLogin: Date.now(),
    });
    if (!foundUser) {
      throw new NotFoundError(`User with ${id} not found`);
    }
    return foundUser;
  } catch (error) {
    throw error;
  }
};

// update user password by ID
export const updatePasswordService = async (
  userId: string,
  newPassword: string
): Promise<UserDocument> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, {
      password: newPassword,
    });
    if (!updatedUser) {
      throw new NotFoundError(`No user found with ID: ${userId}`);
    }
    return updatedUser;
  } catch (error) {
    throw error;
  }
};
