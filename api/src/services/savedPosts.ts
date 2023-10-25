import { NotFoundError } from "../helpers/apiError";
import Post from "../models/Post";
import SavedPost, { SavedPostDocument } from "../models/SavedPost";

export const savePostService = async (
  userId: string,
  postId: string
): Promise<SavedPostDocument> => {
  try {
    // create a new SavedPost record
    const savedPost = new SavedPost({
      userId,
      postId,
    });

    const newSavedPost = savedPost.save();

    // update the post's saveCount
    const post = await Post.findById(postId);
    if (!post) {
      throw new NotFoundError("Post not found");
    }

    post.saveCount += 1;
    await post.save();

    return newSavedPost;
  } catch (error) {
    throw error;
  }
};

export const getSavedPostsByIdService = async (
  postId: string
): Promise<SavedPostDocument> => {
  const savedPost = await SavedPost.findById(postId);
  if (!savedPost) {
    throw new NotFoundError(`Saved post ${postId} not found.`);
  }
  return savedPost;
};

export const getSavedPostsService = async (
  userId: string
): Promise<SavedPostDocument[]> => {
  const savedPost = await SavedPost.find({ userId: userId }).populate({
    path: "postId",
  });

  if (!savedPost) {
    throw new NotFoundError(
      `Saved posts with the user id ${userId} not found.`
    );
  }
  return savedPost;
};

export const removeSavedPostService = async (
  userId: string,
  postId: string
): Promise<void> => {
  await SavedPost.deleteOne({ userId, postId });
};
