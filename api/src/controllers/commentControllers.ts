import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import Comment from "../models/Comment";
import {
  getCommentsByPostIdService,
  createCommentService,
  editCommentService,
  deleteCommentService,
} from "../services/comments";
import User from "../models/User";
import Post from "../models/Post";

type Payload = JwtPayload & {
  _id: string;
};

const JWT_SECRET = process.env.JWT_SECRET as string;

export const getCommentsByPostIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;

    const comments = await getCommentsByPostIdService(postId);

    // return the array of comments
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

// controller function to create a new comment
export const createCommentController = async (
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

    const comment = new Comment({
      content,
      postId,
      userId,
      userName,
    });

    const newComment = await createCommentService(comment);
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const editCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId = req.params._id;
  const { content } = req.body;

  try {
    const updatedComment = await editCommentService(commentId, content);

    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId = req.params.id;

  try {
    const deletedComment = await deleteCommentService(commentId);

    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

function getCommentsByPostId(postId: string) {
  throw new Error("Function not implemented.");
}
// other comment-related controller functions as needed
