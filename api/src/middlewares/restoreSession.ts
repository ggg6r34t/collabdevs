import { v4 as uuidv4 } from "uuid";
import { Response, Request, NextFunction } from "express";

import { redisClient } from "../app";

export const restoreSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.cookies && req.cookies["connect.sid"]) {
    const sessionId = req.cookies["connect.sid"];

    // check if the session ID is valid and exists in Redis
    if (!sessionId) {
      console.log(sessionId, "no session ID");
      return next();
    }

    // retrieve the session data from Redis
    const userSession = await redisClient.get(`sess:${sessionId}`);

    if (userSession !== null) {
      try {
        // parse and store the session data in the request object
        const session = JSON.parse(userSession.toString());

        // check if the session has an expiration timestamp
        if (session.expires && typeof session.expires === "number") {
          const currentTimestamp = Date.now();

          // check if the session has expired
          if (currentTimestamp > session.expires) {
            // generate a new session ID
            const newSessionId = uuidv4();

            // new expiration time
            const expirationTimeInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
            const newExpirationTimestamp =
              currentTimestamp + expirationTimeInMs;

            // create the new session data with the updated expiration timestamp
            const newSessionData = {
              ...session,
              expires: newExpirationTimestamp,
            };

            // delete the expired session from Redis
            await redisClient.del(`sess:${sessionId}`);

            // update the Redis session with the new data and new session ID
            await redisClient.set(
              `sess:${newSessionId}`,
              JSON.stringify(newSessionData)
            );

            req.session = newSessionData;
          } else {
            req.session = session;
          }
        }

        // continue processing the request with the session data
        return next();
      } catch (error) {
        return res.status(500).json({ error: "Session data is invalid." });
      }
    }
  }

  // if no session cookie or session data found, continue without restoring the session
  next();
};
