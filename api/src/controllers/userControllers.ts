import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import { NotFoundError } from "../helpers/apiError";
import {
  createUserService,
  deleteUserByIdService,
  findUserByEmailService,
  getUserByIdService,
  getUserListService,
  updateRestrictionService,
  updateRoleService,
  updateUserByIdService,
  uploadMediaService,
} from "../services/users";
import User, { UserDocument } from "../models/User";

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

declare module "express-serve-static-core" {
  interface Request {
    file: MulterFile;
  }
}

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

//post: Create a new user
export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, firstName, lastName, userName, avatar } = req.body;

  try {
    // check if the email already exists
    let existingUser: UserDocument | null;
    try {
      existingUser = await findUserByEmailService(email.toLowerCase());
    } catch (error) {
      // check if NotFoundError equals null then proceed with user creation
      if (error instanceof NotFoundError) {
        existingUser = null;
      } else {
        throw error;
      }
    }

    if (existingUser) {
      if (
        existingUser.googleId ||
        existingUser.twitterId ||
        existingUser.githubId
      ) {
        // user signed in with at least one of Google, Twitter, or GitHub using this email, allow email/password signup
        if (!existingUser.password) {
          // check if password doesn't already exist in db
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          existingUser.password = hashedPassword;
        } else {
          // else if user already registered with this email, reject signup
          res.status(409).json({ message: "Email already registered" });
        }
        // update other user information
        existingUser.firstName = firstName;
        existingUser.lastName = lastName;
        existingUser.userName = userName;
        existingUser.avatar = avatar;

        await existingUser.save();

        res.status(200).json(existingUser);
      } else {
        // another user already registered with this email, reject signup
        res.status(409).json({ message: "Email already registered" });
      }
    } else {
      // email doesn't exist, create a new user as usual
      // can add validation logic to check fields are not empty
      if (password !== "") {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userInformation = new User({
          email: email.toLowerCase(),
          password: hashedPassword,
          firstName,
          lastName,
          userName,
          avatar,
        });

        const newUser = await createUserService(userInformation);

        res.status(201).json(newUser);
      } else {
        res.status(500).send("Password required");
      }
    }
  } catch (error) {
    next(error);
  }
};

//get userByID
export const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const userById = await getUserByIdService(userId);

    res.status(200).json(userById);
  } catch (error) {
    next(error);
  }
};

//get: get all users
export const getUserListController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userById = await getUserListService();

    res.status(200).json(userById);
  } catch (error) {
    next(error);
  }
};

//put: update userinfo
export const updateUserInfoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName } = req.body;
  if (firstName !== "" && lastName !== "") {
    try {
      const userId = req.params.id;

      // update (firstName and lastName) only. Can add more update info here
      const updatedInformation = {
        firstName,
        lastName,
      };

      const updatedUser = await updateUserByIdService(
        userId,
        updatedInformation
      );

      return res
        .status(201)
        .json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(400).json({ error: "Please fill the required fields" });
  }
};

// post: user upload avatar
export const uploadAvatarController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const avatarData = req.file?.path;

    const user = await uploadMediaService(userId, "avatar", avatarData);

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

// post: user upload banner
export const uploadBannerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const bannerData = req.file?.path;

    const user = await uploadMediaService(userId, "banner", bannerData);

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

// put: update the role
export const updateRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;

    const updatedUser = await updateRoleService(userId);

    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// put: ban user
export const updateRestrictionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;

    const updatedUser = await updateRestrictionService(userId);

    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
//delete: delete a user
export const deleteUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userById = req.params.id;
    const userList = await deleteUserByIdService(userById);

    res.status(403).send();
  } catch (error) {
    next(error);
  }
};
