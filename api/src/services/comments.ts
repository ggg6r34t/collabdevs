import Comment, { CommentDocument } from "../models/Comment";

export const createCommentService = async (
  text: string,
  linkId: string,
  userId: string
): Promise<CommentDocument> => {
  try {
    const newComment = await Comment.create({
      text,
      link: linkId,
      user: userId,
    });
    return newComment;
  } catch (error) {
    throw new Error("Could not create comment");
  }
};

// other comment-related functions as needed
