import express from "express";
import {
  createLinkController,
  getLinksController,
  getLinkById,
  upvoteLinkController,
  downvoteLinkController,
} from "../controllers/linkController";
// import { isAuthenticated } from "../controllers/authController";

const router = express.Router();

router.get("/links", getLinksController);

// FINAL CODE WILL HAVE 'isAuthenticated'
// router.post("/links", isAuthenticated, createLinkController);
// router.put("/links/:linkId/upvote", isAuthenticated, upvoteLinkController);
// router.put("/links/:linkId/downvote", isAuthenticated, downvoteLinkController);

router.post("/links", createLinkController);
router.get("/links/:id", getLinkById);
router.put("/links/:id/upvote", upvoteLinkController);
router.put("/links/:id/downvote", downvoteLinkController);

export default router;
