import { Request, Response, NextFunction } from "express";
import Comment from "../models/Comment";
import {
  createCommentService,
  deleteCommentService,
} from "../services/comments";

// controller function to create a new comment
export const createCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { text, post } = req.body;
  const user = req.body._id;
  const comment = new Comment({
    text,
    post,
    user,
  });

  try {
    const newComment = await createCommentService(comment);
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const deleteCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId = req.params._id;
  try {
    const commment = await deleteCommentService(commentId);
    res.status(201).json("comment delect successfully");
  } catch (error) {
    next(error);
  }
};

// other comment-related controller functions as needed
