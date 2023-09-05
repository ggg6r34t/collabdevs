import { NotFoundError } from "../helpers/apiError";
import Link, { LinkDocument } from "../models/Link";

export const createLinkService = async (
  link: LinkDocument
): Promise<LinkDocument> => {
  try {
    return await link.save();
  } catch (error) {
    console.error("Error creating link:", error);
    throw error;
  }
};

export const getAllLinksService = async (): Promise<LinkDocument[]> => {
  try {
    const links = await Link.find().exec();

    if (!links || links.length === 0) {
      throw new NotFoundError(`Links not found`);
    }

    return links;
  } catch (error) {
    throw error;
  }
};

export const getLinkByIdService = async (
  linkId: string
): Promise<LinkDocument> => {
  const link = await Link.findById(linkId);
  if (!link) {
    throw new NotFoundError(`Link ${linkId} not found.`);
  }
  return link;
};

export const upvoteLinkService = async (
  linkId: string
): Promise<LinkDocument> => {
  try {
    const link = await Link.findById(linkId).exec();

    if (!link) {
      throw new NotFoundError(`Link ${link} not found`);
    }

    link.upvotes += 1;

    const updatedLink = await link.save();

    return updatedLink;
  } catch (error) {
    console.error("Error in upvoteLinkService:", error);
    throw error;
  }
};

export const downvoteLinkService = async (
  linkId: string
): Promise<LinkDocument> => {
  try {
    const link = await Link.findById(linkId).exec();

    if (!link) {
      throw new NotFoundError(`Link ${link} not found`);
    }

    link.downvotes -= 1;

    const updatedLink = await link.save();

    return updatedLink;
  } catch (error) {
    throw error;
  }
};
// other link-related functions as needed
