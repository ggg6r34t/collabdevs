import express from "express";
import passport from "passport";

import {
  createPostController,
  getpostController,
  getPostById,
  upvotePostController,
  downvotePostController,
  getTrendingPostsController,
} from "../controllers/postControllers";

const router = express.Router();

// get all posts (public route)
router.get("/", getpostController);

// get all trending topics
router.get("/trending-topics", getTrendingPostsController);

// create a new post (protected route, requires authentication)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createPostController
);

// get a specific post by its ID (protected route, requires authentication)
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getPostById
);

// dpvote a specific post by its ID (protected route, requires authentication)
router.put(
  "/:id/upvote",
  passport.authenticate("jwt", { session: false }),
  upvotePostController
);

// downvote a specific post by its ID (protected route, requires authentication)
router.put(
  "/:id/downvote",
  passport.authenticate("jwt", { session: false }),
  downvotePostController
);

export default router;
