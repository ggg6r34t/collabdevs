import { Request, Response, NextFunction } from "express";
import SavedPosts from "../models/SavedPost";
import {
  getSavedPostsByIdService,
  getSavedPostsService,
  removeSavedPostService,
  savePostService,
} from "../services/savedPosts";

// controller function to save a post
export const savePostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, postId } = req.body;

    // check if the post is already saved by the user
    const existingSavedPost = await SavedPosts.findOne({ userId, postId });

    if (existingSavedPost) {
      return res.status(400).json({ message: "Post already saved" });
    }

    const savedPost = await savePostService(userId, postId);

    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

// controller function to get saved posts by post id
export const getSavedPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.id;
    const savedPosts = await getSavedPostsByIdService(postId);
    res.status(200).json(savedPosts);
  } catch (error) {
    next(error);
  }
};

// controller function to get saved posts by a user
export const getSavedPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;

    const savedPosts = await getSavedPostsService(userId);

    res.status(200).json(savedPosts);
  } catch (error) {
    next(error);
  }
};

// controller function to remove a saved post
export const removeSavedPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  const postId = req.params.postId;

  try {
    await removeSavedPostService(userId, postId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
