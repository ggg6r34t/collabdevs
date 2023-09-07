import express from "express";
import passport from "passport";

import {
  createCommentController,
  deleteCommentController,
} from "../controllers/commentControllers";

const router = express.Router();

// create a new comment (protected route, requires authentication)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createCommentController
);

// delete a comment by its ID (protected route, requires authentication)
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteCommentController
);

export default router;
