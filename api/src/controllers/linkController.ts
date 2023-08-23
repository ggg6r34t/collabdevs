import { Request, Response, NextFunction } from "express";

import { createLinkService } from "../services/links";

export const createLinkController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, url } = req.body;
    const userId = req.body._id;
    const newLink = await createLinkService({ title, url, userId });
    res.status(201).json(newLink);
  } catch (error) {
    next(error);
  }
};

// other link-related functions as needed
