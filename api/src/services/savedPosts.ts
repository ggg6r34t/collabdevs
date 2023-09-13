import { NotFoundError } from "../helpers/apiError";
import SavedPosts, { SavedPostsDocument } from "../models/SavedPost";

export const savePostService = async (
  userId: string,
  postId: string
): Promise<SavedPostsDocument> => {
  const savedPost = new SavedPosts({
    userId,
    postId,
  });
  return savedPost.save();
};

export const getSavedPostsService = async (
  userId: string
): Promise<SavedPostsDocument[]> => {
  const savedPost = await SavedPosts.find({ userId: userId }).populate({
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
  await SavedPosts.deleteOne({ userId, postId });
};
