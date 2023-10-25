import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

import { getSharedPostService } from "../services/shares";
import User from "../models/User";
import { sharePostService } from "../services/shares";

type Payload = JwtPayload & {
  _id: string;
};

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const createSharedPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as Payload;
    const userId = decoded._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // get the postId from URL parameters
    const postId = req.params.id;

    const share = await sharePostService(postId, userId);

    res.status(201).json(share);
  } catch (error) {
    next(error);
  }
};

export const getSharedPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(404).json({ error: "Post not found." });
    }

    const shares = await getSharedPostService(postId);

    res.status(200).json(shares);
  } catch (error) {
    next(error);
  }
};
