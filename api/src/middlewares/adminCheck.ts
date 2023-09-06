import { Response, Request, NextFunction } from "express";

import { ForbiddenError } from "../helpers/apiError";
import { UserDocument } from "../models/User";

async function adminCheck(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const userData = request.user as UserDocument;
  const userRole = userData.role;

  if (userRole === "admin") {
    next();
  } else {
    next(new ForbiddenError());
  }
}

export default adminCheck;
