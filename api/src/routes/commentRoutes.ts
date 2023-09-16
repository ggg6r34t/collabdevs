import express from "express";
import passport from "passport";

import {
  createCommentController,
  deleteCommentController,
  editCommentController,
  getCommentsByPostIdController,
} from "../controllers/commentControllers";

const router = express.Router();

router.get("/:postId/comments", getCommentsByPostIdController);

// create a new comment (protected route, requires authentication)
router.post(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  createCommentController
);

// edit a comment (protected route, requires authentication)
router.put(
  "/:id/comments",
  passport.authenticate("jwt", { session: false }),
  editCommentController
);

// delete a comment by its ID (protected route, requires authentication)
router.delete(
  "/:id/comments",
  passport.authenticate("jwt", { session: false }),
  deleteCommentController
);

export default router;
