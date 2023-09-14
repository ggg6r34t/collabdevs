import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { UnauthorizedError } from "../helpers/apiError";
import {
  createUserService,
  deleteUserByIdService,
  findUserByEmailService,
  getUserByIdService,
  getUserListService,
  updateLastLoginService,
  updateRestrictionService,
  updateRoleService,
  updateUserByIdService,
} from "../services/users";
import User, { UserDocument } from "../models/User";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // if (req.isAuthenticated()) {
    //   return next();
    // }

    res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    next(error);
  }
};

//post: Create a new user
export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, firstName, lastName, userName, avatar } = req.body;

  // can add validation logic to check fields are not empty
  if (password !== "") {
    try {
      //hash password
      console.log(password, "inside");
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
    } catch (error) {
      next(error);
    }
  } else {
    res.status(500).send("Password required");
  }
};

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;
//post: login user
export const logInUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const userData = await findUserByEmailService(email.toLowerCase());

    if (!userData) {
      return res.status(403).json({ message: "Invalid credentials" });
    }
    //check for password before generating the token

    const hashedPassword = userData.password;
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    await updateLastLoginService(userData._id);

    if (!isPasswordCorrect) {
      throw new UnauthorizedError();
    }
    const token = jwt.sign(
      {
        email: userData.email,
        _id: userData._id,
        firstName: userData.firstName,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ userData, token });
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
      const updatedInformation = {
        firstName,
        lastName,
      };
      const updatedUser = await updateUserByIdService(
        userId,
        updatedInformation
      );

      res.status(201).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    res.send("Please fill the required fields");
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

// google
export const googleAuthenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body.user as UserDocument;

    const token = jwt.sign(
      {
        email: userData.email,
        _id: userData._id,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    if (!userData) {
      res.json({ message: "can't find user with this email" });
      return;
    } else {
      res.json({ token, userData });
    }
    await updateLastLoginService(userData._id);
  } catch (error) {
    next(error);
  }
};
