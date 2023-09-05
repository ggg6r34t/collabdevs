import express from "express";
import {
  createLinkController,
  getLinksController,
  getLinkById,
  upvoteLinkController,
  downvoteLinkController,
} from "../controllers/linkController";
import { isAuthenticated } from "../controllers/authController";

const router = express.Router();

router.get("/links", getLinksController);
router.post("/links", createLinkController);
router.get("/links/:id", isAuthenticated, getLinkById);
router.put("/links/:id/upvote", isAuthenticated, upvoteLinkController);
router.put("/links/:id/downvote", isAuthenticated, downvoteLinkController);

export default router;
