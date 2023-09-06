import express from "express";
import passport from "passport";

import {
  createLinkController,
  getLinksController,
  getLinkById,
  upvoteLinkController,
  downvoteLinkController,
} from "../controllers/linkController";

const router = express.Router();

// get all links (public route)
router.get("/", getLinksController);

// create a new link (protected route, requires authentication)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createLinkController
);

// get a specific link by its ID (protected route, requires authentication)
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getLinkById
);

// dpvote a specific link by its ID (protected route, requires authentication)
router.put(
  "/:id/upvote",
  passport.authenticate("jwt", { session: false }),
  upvoteLinkController
);

// downvote a specific link by its ID (protected route, requires authentication)
router.put(
  "/:id/downvote",
  passport.authenticate("jwt", { session: false }),
  downvoteLinkController
);

export default router;
