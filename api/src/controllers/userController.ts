import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../helpers/apiError";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    }

    res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    next(error);
  }
};
