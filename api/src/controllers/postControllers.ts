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
import Post, { PostDocument } from "../models/Post";
import { redisClient as client } from "../app";
import User from "../models/User";

type Payload = JwtPayload & {
  _id: string;
};

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

// calculate post engagement score for a post
// this is for showing trending posts/projects based on post engagement
export const postEngagementController = (post: PostDocument) => {
  const upvotes = post.upvotes;
  const downvotes = post.downvotes;
  const shares = post.shareCount;
  const saves = post.saveCount;
  const comments = post.commentCount;
  const replies = post.replyCount;

  // weights for each count
  const upvoteWeight = 2;
  const downvoteWeight = -1;
  const shareWeight = 1;
  const saveWeight = 1;
  const commentWeight = 3;
  const replyWeight = 2;

  // calculate the engagement score
  return (
    upvoteWeight * upvotes.length +
    downvoteWeight * downvotes.length +
    shareWeight * shares +
    saveWeight * saves +
    commentWeight * comments +
    replyWeight * replies
  );
};

export const getTrendingPostsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await getAllPostService();

    // define the time frame for recent posts (e.g., last 24 hours)
    const recentPosts = posts.filter((post) => {
      const timestamp = Number(post.createdAt);
      const postAgeInHours = (Date.now() - timestamp) / (1000 * 3600);
      return postAgeInHours;
    });

    // retrieve the engagement scores for recent posts from the cache
    for (const post of recentPosts) {
      const postId = post._id.toString(); // convert the ID to a string if needed

      try {
        const cachedScore = await client.get(postId);

        if (cachedScore !== null) {
          // use the cached engagement score
          post.engagementScore = parseFloat(cachedScore);
        } else {
          // if the score is not in the cache, calculate it and update the cache
          post.engagementScore = postEngagementController(post);
          // set the engagement score in the cache
          const redisKey = `post:${postId}:engagementScore`;
          await client.set(redisKey, post.engagementScore);
        }
      } catch (cacheError) {
        console.error("Error accessing Redis cache:", cacheError);
        // continue processing even if there's an issue with the cache
      }
    }

    // sort the recent posts by their engagement scores in descending order
    recentPosts.sort((postA, postB) => {
      return postB.engagementScore - postA.engagementScore;
    });

    res.status(200).json(recentPosts);
  } catch (error) {
    next(error);
  }
};

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

    // calculate engagement score
    const engagementScore = postEngagementController(newPost);

    // store the score in Redis
    client.set(newPost._id, engagementScore);

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

    // calculate engagement score
    const engagementScore = postEngagementController(post);

    // store the score in Redis
    client.set(postId, engagementScore);

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

    // calculate engagement score
    const engagementScore = postEngagementController(post);

    // store the score in Redis
    client.set(postId, engagementScore);

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
// other post-related functions as needed
