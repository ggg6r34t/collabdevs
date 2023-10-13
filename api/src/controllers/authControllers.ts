import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import {
  findUserByEmailService,
  findUserByResetTokenService,
  getUserByIdService,
} from "../services/users";
import {
  saveResetTokenService,
  sendResetEmailService,
  updateLastLoginService,
  updatePasswordService,
} from "../services/auths";
import { UnauthorizedError } from "../helpers/apiError";
import { UserDocument } from "../models/User";

declare module "express-session" {
  interface SessionData {
    user: { [key: string]: any };
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

// generate a reset token with an expiration time of 1 hour
const generateResetToken = () => {
  const resetToken = uuidv4();
  const resetTokenExpiration = new Date();
  resetTokenExpiration.setHours(resetTokenExpiration.getHours() + 1); // 1 hour
  return { resetToken, resetTokenExpiration };
};

//post: login user
export const logInUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, rememberMe } = req.body;

  try {
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

    foundUserData.rememberMe = rememberMe; // 'rememberMe' field

    // save the updated user document
    await foundUserData.save();

    // exclude password from userData object (also password not included in token)
    // sending only `_id`, `firstName`, `lastName`, `userName`, `email` to the client
    const userData = { ...foundUserData.toObject() };
    delete userData.password;

    // set the expiration time based on 'rememberMe'
    const expirationTime = rememberMe ? "7d" : EXPIRATION_TIME; // extend expiration time for 'rememberMe'
    const token = generateJwtToken(userData, expirationTime);

    // store user information in the session
    req.session.user = userData;

    // set the session token as a cookie
    res.cookie("session_token", token, {
      maxAge: 30 * 60 * 1000, // 30 mins
      httpOnly: process.env.NODE_ENV === "production", // set to true in a production environment with HTTPS
      secure: process.env.NODE_ENV === "production", // set to true in a production environment with HTTPS
      sameSite: "lax", // SameSite policy
    });

    res.json({
      message: "Login successful",
      userData,
      token,
      isCorrectPassword,
    });
  } catch (error) {
    console.error("Error Logging in:", error);
    next(error);
  }
};

//post: logout user
export const logoutUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return next(err);
    }

    res.status(200).json({ message: "Logged out successfully" });
  });
};

function generateJwtToken(
  userData: UserDocument,
  expirationTime: string | undefined
): string {
  const payload: Payload = {
    _id: userData._id,
    firstName: userData.firstName,
  };

  if (userData.email) {
    payload.email = userData.email;
  }

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: expirationTime,
  });
}

// change password for authenticate user
export const changePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const userId = req.params.id;
    const currentUser = await getUserByIdService(userId);

    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const userIdObject = currentUser._id.toString();

    // compare user in database with authenticated user
    if (userIdObject !== req.params.id) {
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

    // check if the provided current password matches the user's current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      currentUser?.password!
    );

    if (isCurrentPasswordValid) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // update the password in the database
      await updatePasswordService(userId, hashedPassword);

      return res.status(200).json({
        message: "Password changed successfully",
      });
    } else {
      return res.status(400).json({
        error: "Current password is incorrect",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const requestPasswordResetController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmailService(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // unique reset token saved to database
    const { resetToken, resetTokenExpiration } = generateResetToken();
    await saveResetTokenService(user.id, resetToken, resetTokenExpiration);

    // send an email to the user containing the reset token link
    await sendResetEmailService(user.email, resetToken);

    return res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { resetToken, newPassword } = req.body;
    const user = await findUserByResetTokenService(resetToken);

    if (!user || resetTokenHasExpired(user?.resetTokenExpiration)) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    // validate the new password
    if (!isValidPassword(newPassword)) {
      return res.status(400).json({
        error: "Invalid password. Password must meet security requirements.",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // update the user's password in the database
    await updatePasswordService(user.id, hashedPassword);

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

// check if a reset token has expired
const resetTokenHasExpired = (resetTokenExpiration: Date | null) => {
  if (resetTokenExpiration === null) {
    return true; // expired if resetTokenExpiration is null
  }

  const currentTime = new Date();
  return currentTime > resetTokenExpiration;
};

// validate password format
// we can also use this for user's creating an account
function isValidPassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
}

// twitter
export const twitterAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.user as UserDocument;
    const token = generateJwtToken(userData, undefined);

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
    const token = generateJwtToken(userData, undefined);

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
    const token = generateJwtToken(userData, undefined);

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
