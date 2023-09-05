import { Request, Response, NextFunction } from "express";

import {
  createLinkService,
  downvoteLinkService,
  getAllLinksService,
  getLinkByIdService,
  upvoteLinkService,
} from "../services/links";
import Link from "../models/Link";

export const getLinksController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const link = await getAllLinksService();
    res.status(200).json(link);
  } catch (error) {
    next(error);
  }
};

export const createLinkController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newLink = new Link({
      title: req.body.title,
      url: req.body.url,
      userId: req.params.userId,
    });
    const link = await createLinkService(newLink);
    res.status(201).json(link);
  } catch (error) {
    next(error);
  }
};

export const getLinkById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const linkId = req.params.id;
    const link = await getLinkByIdService(linkId);
    res.status(200).json(link);
  } catch (error) {
    next(error);
  }
};

export const upvoteLinkController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const linkId = req.params.id;
    const link = await upvoteLinkService(linkId);

    res.status(200).json(link);
  } catch (error) {
    next(error);
  }
};

export const downvoteLinkController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const linkId = req.params.id;
    const link = await downvoteLinkService(linkId);
    res.status(200).json(link);
  } catch (error) {
    next(error);
  }
};
// other link-related functions as needed
