import Reply, { ReplyDocument } from "../models/Reply";

export const getAllReplysService = async () => {
  try {
    const replys = await Reply.find();

    return replys;
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
