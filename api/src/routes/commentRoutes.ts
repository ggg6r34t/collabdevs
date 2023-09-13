import express from "express";
import passport from "passport";

import {
  createCommentController,
  deleteCommentController,
  editCommentController,
  getAllCommentsController,
} from "../controllers/commentControllers";

const router = express.Router();

router.get("/", getAllCommentsController);

// create a new comment (protected route, requires authentication)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createCommentController
);

// edit a comment (protected route, requires authentication)
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  editCommentController
);

// delete a comment by its ID (protected route, requires authentication)
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteCommentController
);

export default router;
