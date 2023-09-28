import { Request, Response, NextFunction } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";
import rateLimit from "express-rate-limit";
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

interface Payload {
  _id: string;
  firstName: string;
  email?: string;
}

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;
const EXPIRATION_TIME = "1h";

// rate limiting middleware for sign-in attempts
const rateLimiter = new RateLimiterMemory({
  points: 5, //  login attempts allowed
  duration: 60,
});

// rate limiting middleware for password change
const passwordChangeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // number of requests per windowMs
  message: { error: "Too many requests. Please try again later." },
});

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

//post: login user
export const logInUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    // check if the IP address (or user identifier) is rate-limited
    const rateLimiterResponse = await rateLimiter.consume(email);

    if (rateLimiterResponse.consumedPoints > 4) {
      throw new Error("Too many sign-in attempts. Please try again later.");
    }

    const foundUserData = await findUserByEmailService(email.toLowerCase());

    if (!foundUserData) {
      res.status(403).json({ message: "Invalid credentials" });
      return;
    }

    // verify user password
    const hashedPassword = foundUserData.password;

    // verify that password and hashedPassword are valid
    if (!password || !hashedPassword) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);

    if (!isCorrectPassword) {
      throw new UnauthorizedError("Invalid credentials");
    }

    // exclude password from userData object (also password not included in token)
    // sending only `_id`, `firstName`, `lastName`, `userName`, `email` to the client
    const userData = { ...foundUserData.toObject() };
    delete userData.password;

    const token = generateJwtToken(userData);

    res.json({ userData, token, isCorrectPassword });
  } catch (error) {
    console.error("Error Logging in:", error);
    next(error);
  }
};

function generateJwtToken(userData: UserDocument): string {
  const payload: Payload = {
    _id: userData._id,
    firstName: userData.firstName,
  };

  if (userData.email) {
    payload.email = userData.email;
  }

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: EXPIRATION_TIME,
  });
}

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

// change password for authenticate user
export const changePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passwordChangeLimiter(req, res, async () => {
    const { newPassword } = req.body;
    try {
      const userId = req.params.id;
      const currentUser = await getUserByIdService(userId);

      if (!currentUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // compare user in database with authenticated user
      if (currentUser._id !== req.params.id) {
        return res
          .status(403)
          .json({ error: "Unauthorized to change this password" });
      }

      // validate the new password
      if (!isValidPassword(newPassword)) {
        return res.status(400).json({
          error:
            "Invalid password. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.",
        });
      }

      const oldPassword = currentUser?.password;

      if (oldPassword !== undefined) {
        const passwordChanged = !(await bcrypt.compare(
          newPassword,
          oldPassword
        ));

        if (passwordChanged) {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
          const updatedInformation = {
            password: hashedPassword,
          };

          return res.status(200).json({
            message: "Password changed successfully",
            updatedInformation,
          });
        } else {
          return res.status(400).json({
            error: "New password must be different from the current password",
          });
        }
      }
    } catch (error) {
      next(error);
    }
  });
};

// function to validate password format
// we can also use this for user's creating an account
function isValidPassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
}

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

// twitter
export const twitterAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.user as UserDocument;
    const token = generateJwtToken(userData);

    if (!userData) {
      res
        .status(404)
        .json({ message: "User not found with this Twitter account" });
      return;
    } else {
      res.json({ token, userData });
    }
    await updateLastLoginService(userData._id);
  } catch (error) {
    console.error("Error in twitterAuthenticate:", error);
    return next(error);
  }
};

// github
export const githubAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.user as UserDocument;
    const token = generateJwtToken(userData);

    if (!userData) {
      res
        .status(404)
        .json({ message: "User not found with this GitHub account" });
      return;
    } else {
      res.json({ token, userData });
    }
    await updateLastLoginService(userData._id);
  } catch (error) {
    console.error("Error in githubAuthenticate:", error);
    return next(error);
  }
};

// google
export const googleAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.user as UserDocument;
    const token = generateJwtToken(userData);

    if (!userData) {
      res
        .status(404)
        .json({ message: "User not found with this Google account" });
      return;
    } else {
      res.json({ token, userData });
    }
    await updateLastLoginService(userData._id);
  } catch (error) {
    console.error("Error in googleAuthenticate:", error);
    return next(error);
  }
};
