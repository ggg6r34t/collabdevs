import { Request, Response, NextFunction } from "express";

import { createCommentService } from "../services/comments";

// controller function to create a new comment
export const createCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text, linkId } = req.body;
    const userId = req.body._id;
    const newComment = await createCommentService(text, linkId, userId);
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

// other comment-related controller functions as needed
