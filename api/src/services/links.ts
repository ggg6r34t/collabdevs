import Link, { LinkDocument } from "../models/Link";

export const createLinkService = async (
  data: {
    title: string;
    url: string;
    userId: string;
  }
): Promise<LinkDocument> => {
  try {
    // const newLink = await Link.create({ title, url, user: userId });
    // return newLink;
    const newLink = new Link({
      title: data.title,
      url: data.url,
      userId: data.userId,
    });
    return await newLink.save();
  } catch (error) {
    throw new Error("Could not create link");
  }
};

// other link-related functions as needed
