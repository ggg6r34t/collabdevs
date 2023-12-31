import mongoose from "mongoose";
import { NotFoundError } from "../helpers/apiError";
import Post, { PostDocument } from "../models/Post";
import Share, { ShareDocument } from "../models/Share";
import User from "../models/User";

export const sharePostService = async (
  postId: string,
  userId: string
): Promise<ShareDocument> => {
  try {
    // create a new Share record
    const newShare = new Share({
      user: userId,
      post: postId,
    });

    const savedShare = await newShare.save();

    // update the post's shareCount
    const post = await Post.findById(postId);
    if (!post) {
      throw new NotFoundError("Post not found");
    }

    post.shareCount += 1;
    await post.save();

    // update the user's shared posts
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const postIdObject = new mongoose.Types.ObjectId(postId);
    user.shares.push(postIdObject);
    await user.save();

    return savedShare;
  } catch (error) {
    throw error;
  }
};

export const getSharedPostService = async (postId: string) => {
  try {
    // find shares related to the given post
    const shares = await Share.find({ postId });

    return shares;
  } catch (error) {
    throw error;
  }
};
