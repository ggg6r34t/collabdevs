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
  const { text, linkId } = req.body;
  const userId = req.body._id;

  const comment = new Comment({
    text,
    linkId,
    userId,
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
  const commentId = req.body._id;
  const userId = req.body.user;
  try {
   const commment = await deleteCommentService(commentId, userId);
    res.status(201).json("comment delect successfully");
  } catch (error) {
    next(error);
  }
};

// other comment-related controller functions as needed
