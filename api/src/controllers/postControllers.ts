import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

import {
  createPostService,
  downvotePostService,
  getAllPostService,
  getPostByIdService,
  upvotePostService,
} from "../services/posts";
import Post from "../models/Post";
import User from "../models/User";

type Payload = JwtPayload & {
  _id: string;
};

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const getpostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await getAllPostService();
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const createPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content, url } = req.body;

  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as Payload;
    const userId = decoded._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const userName = user.userName;

    const newPost = new Post({
      title,
      content,
      url,
      userId,
      userName,
    });

    const post = await createPostService(newPost);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.id;
    const post = await getPostByIdService(postId);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const upvotePostController = async (
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
    const userId = decoded._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const postId = req.params.id;
    const post = await upvotePostService(postId, userId);

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const downvotePostController = async (
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
    const userId = decoded._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const postId = req.params.id;
    const post = await downvotePostService(postId, userId);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
// other post-related functions as needed
