import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import { NotFoundError } from "../helpers/apiError";
import {
  createUserService,
  deleteUserByIdService,
  findUserByEmailService,
  getUserByIdService,
  getUserListService,
  sendConfirmEmailService,
  updateRestrictionService,
  updateRoleService,
  updateUserByIdService,
  uploadMediaService,
} from "../services/users";
import User, { UserDocument } from "../models/User";
import { redisClient as client } from "../app";
import { getPostByUserIdService } from "../services/posts";

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

type Payload = JwtPayload & {
  _id: string;
};

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

// generate an email confirmation token with a 1-hour expiration
const generateConfirmEmailToken = () => {
  const emailConfirmationToken = uuidv4();
  const confirmEmailTokenExpiration = new Date();
  confirmEmailTokenExpiration.setHours(
    confirmEmailTokenExpiration.getHours() + 1
  ); // 1 hour expiration

  return { emailConfirmationToken, confirmEmailTokenExpiration };
};

const BEHAVIOR_WEIGHTS = {
  votes: 2,
  comments: 3,
  replies: 2,
  shares: 1,
  followers: 4,
  stars: 4,
  collaborationRequests: 8,
};

/**
 * Calculate the similarity between two users based on behavior.
 * @param {UserDocument} userA - The first user.
 * @param {UserDocument} userB - The second user.
 * @returns {number} - The similarity score.
 */
const calculateSimilarity = (
  userA: UserDocument,
  userB: UserDocument
): number => {
  const behaviorA = userA.behaviour;
  const behaviorB = userB.behaviour;

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < behaviorA.length; i++) {
    const valA = Number(behaviorA[i]);
    const valB = Number(behaviorB[i]);

    dotProduct += valA * valB;
    magnitudeA += valA ** 2;
    magnitudeB += valB ** 2;
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  const similarity = dotProduct / (magnitudeA * magnitudeB);

  return similarity;
};

/**
 * Calculate the engagement score for a user based on their behavior.
 * @param {UserDocument} user - The user.
 * @returns {number} - The engagement score.
 */
const calculateEngagementScore = (user: UserDocument): number => {
  const behavior = {
    votes: BEHAVIOR_WEIGHTS.votes * user.votes.length,
    comments: BEHAVIOR_WEIGHTS.comments * user.comments.length,
    replies: BEHAVIOR_WEIGHTS.replies * user.replies.length,
    shares: BEHAVIOR_WEIGHTS.shares * user.shares.length,
    followers: BEHAVIOR_WEIGHTS.followers * user.followers.length,
    stars: BEHAVIOR_WEIGHTS.stars * user.stars.length,
    collaborationRequests:
      BEHAVIOR_WEIGHTS.collaborationRequests *
      user.collaborationRequests.length,
  };

  user.behaviour = Object.values(behavior);

  return Object.values(behavior).reduce((sum, value) => sum + value, 0);
};

/**
 * Sort users by similarity and engagement score.
 * @param {UserDocument} currentUser - The current user.
 * @param {UserDocument[]} users - The list of users to sort.
 */
const sortUsers = async (currentUser: UserDocument, users: UserDocument[]) => {
  users.forEach((user) => {
    user.similarity = calculateSimilarity(currentUser, user);
    user.engagementScore = calculateEngagementScore(user);
  });

  users.sort((userA, userB) => {
    if (userA.similarity > userB.similarity) {
      return -1;
    } else if (userA.similarity < userB.similarity) {
      return 1;
    } else {
      if (userA.engagementScore > userB.engagementScore) {
        return -1;
      } else if (userA.engagementScore < userB.engagementScore) {
        return 1;
      } else {
        return 0;
      }
    }
  });
};

/**
 * Get recommended users for the current user, considering mutual followers.
 */
export const getRecommendedUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as Payload;
    const decodedUserId = decoded._id;

    const currentUser = await User.findById(decodedUserId);

    if (!currentUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // retrieve all users' profiles
    const allUsers = await getUserListService();

    // // Fetch mutual followers for the current user
    // const currentUserFollowers = currentUser.followers.map((follower) =>
    //   follower.toString()
    // );

    // // Filter recommended users to include only those who are mutual followers
    // const recommendedUsers = allUsers.filter((otherUser) => {
    //   const otherUserFollowers = otherUser.followers.map((follower) =>
    //     follower.toString()
    //   );
    //   return (
    //     otherUser._id.toString() !== currentUser._id.toString() && // exclude the current user from recommendedUsers
    //     currentUserFollowers.includes(otherUser._id.toString()) && // check for mutual followers
    //     otherUserFollowers.includes(currentUser._id.toString()) // check if the otherUser is following the current user.
    //   );
    // });

    // set and get engagement scores for all users
    const promises = allUsers.map(async (otherUser) => {
      const userId = otherUser._id.toString();

      // attempt to retrieve the user's engagement score from Redis
      const cachedScore = await client.get(`user:${userId}:engagementScore`);

      if (cachedScore !== null) {
        // use the cached engagement score
        otherUser.engagementScore = parseFloat(cachedScore);
      } else {
        // if the score is not in the cache, calculate it and update the cache
        otherUser.engagementScore = calculateEngagementScore(otherUser);
        // store the calculated score in Redis
        const redisKey = `user:${userId}:engagementScore`;
        await client.set(redisKey, otherUser.engagementScore);
      }
    });

    await Promise.all(promises);

    // exclude the current user from recommendedUsers
    const recommendedUsers = allUsers.filter(
      (otherUser) => otherUser._id.toString() !== currentUser._id.toString()
    );

    sortUsers(currentUser, recommendedUsers);

    const topRecommendedUsers = recommendedUsers.slice(0, 4);

    res.json(topRecommendedUsers);
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

          // unique reset emailConfirmationToken saved to database
          emailConfirmationToken:
            generateConfirmEmailToken().emailConfirmationToken,
          confirmEmailTokenExpiration:
            generateConfirmEmailToken().confirmEmailTokenExpiration,
        });

        const newUser = await createUserService(userInformation);

        // send an email to the user containing the reset emailConfirmationToken link
        await sendConfirmEmailService(
          newUser.email,
          newUser.emailConfirmationToken!
        );

        res.status(201).json({ message: "Confirmation email sent", newUser });
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

// get posts by userID
export const getPostsByUserIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;

    const userPosts = await getPostByUserIdService(userId);

    res.status(200).json(userPosts);
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
  try {
    const userId = req.params.id;

    // object to store the updated fields
    const updatedInformation: { [key: string]: any } = {};

    // fields that can be updated
    const allowedFields = [
      "firstName",
      "lastName",
      "userName",
      "headline",
      "bio",
      "email",
      "socialLinks",
    ];

    // iterate through allowed fields and check if they exist in the request body
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updatedInformation[field] = req.body[field];
      }
    });

    // check if any fields were updated
    if (Object.keys(updatedInformation).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const updatedUser = await updateUserByIdService(userId, updatedInformation);

    return res
      .status(201)
      .json({ message: "Profile updated successfully", updatedUser });
  } catch (error) {
    next(error);
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
