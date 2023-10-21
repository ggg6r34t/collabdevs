import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import Notification from "../models/Notification";
import { createNotificationService } from "../services/notifications";
import User from "../models/User";
import Post from "../models/Post";

type Payload = JwtPayload & {
  _id: string;
};

const JWT_SECRET = process.env.JWT_SECRET as string;

export const createNotificationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { content, postId } = req.body;

  if (!content || !postId) {
    return res.status(400).json({ error: "Content and postId are required." });
  }

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

    const postExists = await Post.exists({ _id: postId });

    if (!postExists) {
      return res.status(404).json({ error: "Post not found." });
    }

    const notification = new Notification({
      content,
      postId,
      userId,
      userName,
    });

    const newComment = await createNotificationService(notification);
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};
