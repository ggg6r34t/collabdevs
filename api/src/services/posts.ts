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
  postId: string
): Promise<PostDocument> => {
  try {
    const post = await Post.findById(postId).exec();

    if (!post) {
      throw new NotFoundError(`Post ${post} not found`);
    }

    post.voteScore += 1;

    const updatedPost = await post.save();

    return updatedPost;
  } catch (error) {
    console.error("Error in upvotePostService:", error);
    throw error;
  }
};

export const downvotePostService = async (
  postId: string
): Promise<PostDocument> => {
  try {
    const post = await Post.findById(postId).exec();

    if (!post) {
      throw new NotFoundError(`Post ${post} not found`);
    }

    if (post.voteScore > 0) {
      post.voteScore -= 1;
    }

    const updatedPost = await post.save();

    return updatedPost;
  } catch (error) {
    throw error;
  }
};
// other post-related functions as needed
