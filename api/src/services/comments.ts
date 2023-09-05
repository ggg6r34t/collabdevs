import Comment, { CommentDocument } from "../models/Comment";

export const createCommentService = async (
  comment: CommentDocument
): Promise<CommentDocument> => {
  try {
    const newComment = await Comment.create({
      comment,
    });
    return newComment;
  } catch (error) {
    throw new Error("Could not create comment");
  }
};

export const deleteCommentService = async (
  commentId: string,
  user: string
): Promise<CommentDocument> => {
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error(`Could not find comment from ${user}`);
    } else {
      comment.deleteOne;
    }
  } catch (error) {
    throw new Error("Could not delete comment");
  }
};

// other comment-related functions as needed
