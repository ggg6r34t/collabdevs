import Comment, { CommentDocument } from "../models/Comment";

export const createCommentService = async (
  comment: CommentDocument
): Promise<CommentDocument> => {
  return await comment.save();
};

export const deleteCommentService = async (
  commentId: string
): Promise<CommentDocument | any> => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error(`Could not find comment from ${commentId}`);
  } else {
    comment.deleteOne;
  }
};

// other comment-related functions as needed
