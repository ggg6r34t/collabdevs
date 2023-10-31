import { NotFoundError } from "../helpers/apiError";
import Comment, { CommentDocument } from "../models/Comment";
import Post from "../models/Post";

export const createCommentService = async (
  content: string,
  postId: string,
  userId: string,
  userName: string
): Promise<CommentDocument> => {
  try {
    // create a new Comment record
    const comment = new Comment({
      content,
      postId,
      userId,
      userName,
    });

    const newComment = await comment.save();

    // update the post's commentCount
    const post = await Post.findById(postId);
    if (!post) {
      throw new NotFoundError("Post not found");
    }

    post.commentCount += 1;
    await post.save();

    return newComment;
  } catch (error) {
    throw error;
  }
};

export const getCommentsByPostIdService = async (postId: string) => {
  try {
    // find comments that belong to the given postId
    const comments = await Comment.find({ postId });

    return comments;
  } catch (error) {
    throw error;
  }
};

export const editCommentService = async (
  commentId: string,
  newContent: string
) => {
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return null;
    }

    comment.content = newContent;

    const updatedComment = await comment.save();

    return updatedComment;
  } catch (error) {
    throw error;
  }
};

export const deleteCommentService = async (
  commentId: string
): Promise<CommentDocument | null> => {
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return null;
    }

    const deletedComment = await comment.deleteOne();

    return deletedComment; // Return the deleted comment
  } catch (error) {
    throw error;
  }
};

// other comment-related functions as needed
