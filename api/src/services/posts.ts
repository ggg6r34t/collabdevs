import mongoose from "mongoose";
import { NotFoundError } from "../helpers/apiError";
import Post, { PostDocument } from "../models/Post";

export const createPostService = async (
  post: PostDocument
): Promise<PostDocument> => {
  try {
    return await post.save();
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const getAllPostService = async (): Promise<PostDocument[]> => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).exec();

    if (!posts || posts.length === 0) {
      throw new NotFoundError(`Post not found`);
    }

    return posts;
  } catch (error) {
    throw error;
  }
};

export const getPostByIdService = async (
  postId: string
): Promise<PostDocument> => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new NotFoundError(`Post ${postId} not found.`);
  }
  return post;
};

export const upvotePostService = async (
  postId: string,
  userId: string
): Promise<PostDocument> => {
  try {
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error(`Post not found`);
    }

    // convert userId to ObjectId
    const userIdObject = new mongoose.Types.ObjectId(userId);

    const hasUpvoted = post.upvotes.includes(userIdObject);

    if (hasUpvoted) {
      // remove the upvote
      post.upvotes = post.upvotes.filter((id) => !id.equals(userIdObject));
      post.voteScore -= 1;
      console.log("Minus one!");
    } else {
      // add the upvote
      post.upvotes.push(userIdObject);
      post.voteScore += 1;
      console.log("Plus one!");
    }

    // update post
    const updatedPost = await post.save();

    return updatedPost;
  } catch (error) {
    console.error("Error in upvotePostService:", error);
    throw error;
  }
};

export const downvotePostService = async (
  postId: string,
  userId: string
): Promise<PostDocument> => {
  try {
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error(`Post not found`);
    }

    // convert userId to ObjectId
    const userIdObject = new mongoose.Types.ObjectId(userId);

    const hasDownvoted = post.downvotes.includes(userIdObject);

    if (hasDownvoted) {
      // remove the downvote
      post.downvotes = post.downvotes.filter((id) => !id.equals(userIdObject));
      // update the voteScore, ensuring it doesn't go below 0
      if (post.voteScore > 0) {
        post.voteScore -= 1;
        console.log("Minus one");
      }
    } else {
      // add the downvote
      post.downvotes.push(userIdObject);
    }

    // update post
    const updatedPost = await post.save();

    return updatedPost;
  } catch (error) {
    console.error("Error in downvotePostService:", error);
    throw error;
  }
};

// other post-related functions as needed
