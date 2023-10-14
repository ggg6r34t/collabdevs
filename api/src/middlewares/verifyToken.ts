import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import dotenv from "dotenv";

import { UserDocument } from "../models/User";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

// tested and not working as intended (might remove)
function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // verify the token
  jwt.verify(token.replace("Bearer ", ""), JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    if (!decoded) {
      console.error("Token verification error: Decoded token is empty");
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // if token is successfully verified, store user information in the request object
    req.user = decoded as UserDocument;

    // log the verification and call next() to proceed with the request
    console.log("Token verified:", decoded);

    // call next() to continue to the next middleware or route handler
    next();
  });
}

export default verifyToken;
