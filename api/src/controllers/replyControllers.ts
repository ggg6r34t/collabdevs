import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

import Reply from "../models/Reply";
import {
  createReplyService,
  editReplyService,
  deleteReplyService,
  getRepliesByPostIdService,
} from "../services/replies";
import User from "../models/User";
import Post from "../models/Post";
import Comment from "../models/Comment";

type Payload = JwtPayload & {
  _id: string;
};

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const getRepliesByPostIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;

    const replies = await getRepliesByPostIdService(commentId);

    // return the array of replies
    res.status(200).json(replies);
  } catch (error) {
    next(error);
  }
};

// controller function to create a new reply
export const createReplyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { content, postId, commentId } = req.body;

  if (!content || !postId || !commentId) {
    return res
      .status(400)
      .json({ error: "Content, postId, and commentId are required." });
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

    const commentExists = await Comment.exists({ _id: commentId });

    if (!postExists || !commentExists) {
      return res.status(404).json({ error: "Post not found." });
    }

    const reply = new Reply({
      content,
      commentId,
      postId,
      userId,
      userName,
    });

    const newReply = await createReplyService(reply);
    res.status(201).json(newReply);
  } catch (error) {
    next(error);
  }
};

export const editReplyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const replyId = req.params._id;
  const { content } = req.body;

  try {
    const updatedReply = await editReplyService(replyId, content);

    if (!updatedReply) {
      return res.status(404).json({ error: "Reply not found" });
    }

    res.status(200).json(updatedReply);
  } catch (error) {
    next(error);
  }
};

export const deleteReplyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const replyId = req.params.id;

  try {
    const deletedReply = await deleteReplyService(replyId);

    if (!deletedReply) {
      return res.status(404).json({ error: "Reply not found" });
    }

    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// other reply-related controller functions as needed
