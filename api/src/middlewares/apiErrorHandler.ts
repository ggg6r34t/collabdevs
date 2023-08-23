import { NextFunction, Request, Response } from "express";

import ApiError from "../helpers/apiError";

export default function (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  //log the error
  console.error("Error:", error);

  //determine the status code and message
  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const message = error.message || "An error occurred.";

  const stack =
    process.env.NODE_ENV === "development" && error instanceof ApiError
      ? error.stack
      : undefined;

  // send the response
  res.status(error.statusCode).json({
    status: "error",
    statusCode,
    message,
    stack,
  });
}
