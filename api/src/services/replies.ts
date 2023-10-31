import { NotFoundError } from "../helpers/apiError";
import Post from "../models/Post";
import Reply, { ReplyDocument } from "../models/Reply";

export const getRepliesByPostIdService = async (commentId: string) => {
  try {
    // find replies that belong to the given commentId
    const replies = await Reply.find({ commentId });

    return replies;
  } catch (error) {
    throw error;
  }
};

export const createReplyService = async (
  content: string,
  commentId: string,
  postId: string,
  userId: string,
  userName: string
): Promise<ReplyDocument> => {
  try {
    // create a new Reply record
    const reply = new Reply({
      content,
      commentId,
      postId,
      userId,
      userName,
    });

    const newReply = await reply.save();

    // update the post's replyCount
    const post = await Post.findById(postId);
    if (!post) {
      throw new NotFoundError("Post not found");
    }

    post.replyCount += 1;
    await post.save();

    return newReply;
  } catch (error) {
    throw error;
  }
};

export const editReplyService = async (replyId: string, newContent: string) => {
  try {
    const reply = await Reply.findById(replyId);

    if (!reply) {
      return null;
    }

    reply.content = newContent;

    const updatedReply = await reply.save();

    return updatedReply;
  } catch (error) {
    throw error;
  }
};

export const deleteReplyService = async (
  replyId: string
): Promise<ReplyDocument | null> => {
  try {
    const reply = await Reply.findById(replyId);

    if (!reply) {
      return null;
    }

    const deletedReply = await reply.deleteOne();

    return deletedReply; // Return the deleted reply
  } catch (error) {
    throw error;
  }
};

// other reply-related functions as needed
