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
  reply: ReplyDocument
): Promise<ReplyDocument> => {
  return await reply.save();
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
