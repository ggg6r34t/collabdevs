import {
  AlreadyExist,
  InternalServerError,
  NotFoundError,
} from "../helpers/apiError";
import User, { UserDocument } from "../models/User";

export const createUserService = async (
  newUser: UserDocument
): Promise<UserDocument> => {
  const alreadyExist = await User.findOne({ email: newUser.email });
  if (alreadyExist) {
    throw new AlreadyExist(`User with ${newUser.email} Already Exist`);
  } else return await newUser.save();
};

export const findUserByEmailService = async (
  email: string
): Promise<UserDocument> => {
  const foundUser = await User.findOne({ email: email, isBanned: false });

  if (!foundUser) {
    throw new NotFoundError(`User with ${email} not found`);
  }
  return foundUser;
};

export const updateLastLoginService = async (
  id: string
): Promise<UserDocument> => {
  const foundUser = await User.findByIdAndUpdate(id, {
    lastLogin: Date.now(),
  });

  if (!foundUser) {
    throw new NotFoundError(`User with ${id} not found`);
  }
  return foundUser;
};

// get userByID service
export const getUserByIdService = async (
  userId: string
): Promise<UserDocument> => {
  const userById = await User.findById(userId).select("-password");
  if (!userById) {
    throw new NotFoundError(`No user found having ${userId}`);
  }
  return userById;
};

// user list service
export const getUserListService = async (): Promise<UserDocument[]> => {
  const userList = await User.find();
  return userList;
};

// update user information
export const updateUserByIdService = async (
  userId: string,
  updateUserInformation: Partial<UserDocument>
): Promise<UserDocument> => {
  const userById = await User.findByIdAndUpdate(userId, updateUserInformation, {
    new: true,
  });
  if (!userById) {
    throw new NotFoundError(`No user found having ${userId}`);
  }
  return userById;
};

// save media upload (user)
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
      // check if mediaType is a valid property before assigning
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
export const updateRoleService = async (userId: string) => {
  const foundUser = await User.findOne({ _id: userId });
  if (foundUser) {
    if (foundUser.role === "admin") {
      foundUser.role = "user";
    } else {
      // avoid making a "banned user" admin by mistake
      if (foundUser.isBanned === true) {
        foundUser.role = "user";
      } else {
        foundUser.role = "admin";
      }
    }
    const updatedUser = updateUserByIdService(userId, foundUser);
    return updatedUser;
  } else {
    throw new NotFoundError(`User not found with ${userId}`);
  }
};

// update restrictions (Banning)
export const updateRestrictionService = async (userId: string) => {
  const foundUser = await User.findOne({ _id: userId });
  if (foundUser) {
    if (foundUser.isBanned === false) {
      foundUser.isBanned = true;
    } else {
      foundUser.isBanned = false;
    }

    const updatedUser = updateUserByIdService(userId, foundUser);
    return updatedUser;
  } else {
    throw new NotFoundError(`User not found with ${userId}`);
  }
};

// delete user
export const deleteUserByIdService = async (
  userId: string
): Promise<UserDocument> => {
  const userById = await User.findByIdAndDelete(userId);
  if (!userById) {
    throw new NotFoundError(`No user found having ${userId}`);
  }
  return userById;
};

//TODO ::  google
export const findOrCreateUserService = async (
  payload: Partial<UserDocument>
): Promise<UserDocument> => {
  const user = await User.findOne({ email: payload.email });

  if (user) {
    return user;
  } else {
    const newUser = new User({
      email: payload.email,
      userName: payload.userName,
      firstName: payload.firstName,
      lastName: payload.lastName,
      avatar: payload.avatar,
    });

    try {
      return await newUser.save();
    } catch (error) {
      console.error("Error creating account:", error);
      throw new InternalServerError(
        "An error occured while creating the account."
      );
    }
  }
};
