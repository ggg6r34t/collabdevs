import Comment, { CommentDocument } from "../models/Comment";

export const createCommentService = async (
  comment: CommentDocument
): Promise<CommentDocument> => {
  return await comment.save();
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
