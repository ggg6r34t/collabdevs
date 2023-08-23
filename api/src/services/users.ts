import { InternalServerError, NotFoundError } from "../helpers/apiError";
import User, { UserDocument } from "../models/User";

export const createUserService = async (
  newUser: UserDocument
): Promise<UserDocument> => {
  try {
    return await newUser.save();
  } catch (error) {
    console.error("Error creating account:", error);
    throw new InternalServerError(
      "An error occured while creating the account."
    );
  }
};

export const findUserByEmailService = async (
  userEmail: string
): Promise<UserDocument> => {
  try {
    // using select query to avoid sending user password to the client
    const foundUser = await User.findOne({ email: userEmail }).select(
      "-password"
    );

    if (!foundUser) {
      throw new NotFoundError(`User not found with the email ${userEmail}.`);
    }
    return foundUser;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new InternalServerError(
      "An error occured while searching for the user."
    );
  }
};

export const findOrCreateUserService = async (
  payload: Partial<UserDocument>
): Promise<UserDocument> => {
  const user = await User.findOne({ email: payload.email });

  if (user) {
    return user;
  } else {
    const newUser = new User({
      email: payload.email,
      username: payload.username,
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
