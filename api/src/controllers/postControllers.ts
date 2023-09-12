import { Request, Response, NextFunction } from "express";

import {
  createPostService,
  downvotePostService,
  getAllPostService,
  getPostByIdService,
  upvotePostService,
} from "../services/posts";
import Post from "../models/Post";

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
  try {
    const newPost = new Post({
      title: req.body.title,
      url: req.body.url,
      userId: req.params.userId,
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
  try {
    const postId = req.params.id;
    const post = await upvotePostService(postId);

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
  try {
    const postId = req.params.id;
    const post = await downvotePostService(postId);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
// other post-related functions as needed
