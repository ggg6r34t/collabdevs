import {
  AlreadyExist,
  InternalServerError,
  NotFoundError,
} from "../helpers/apiError";
import User, { UserDocument } from "../models/User";

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
    const userList = await User.find();
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

// find a user by reset token
export const findUserByResetTokenService = async (
  resetToken: string
): Promise<UserDocument> => {
  try {
    const userByToken = await User.findOne({ resetToken });
    if (!userByToken) {
      throw new NotFoundError(`No user found with reset token: ${resetToken}`);
    }
    return userByToken;
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
