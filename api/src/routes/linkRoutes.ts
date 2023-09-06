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

router.get("/links", getLinksController);
router.post(
  "/links",
  passport.authenticate("jwt", { session: false }),
  createLinkController
);
router.get(
  "/links/:id",
  passport.authenticate("jwt", { session: false }),
  getLinkById
);
router.put(
  "/links/:id/upvote",
  passport.authenticate("jwt", { session: false }),
  upvoteLinkController
);
router.put(
  "/links/:id/downvote",
  passport.authenticate("jwt", { session: false }),
  downvoteLinkController
);

export default router;
