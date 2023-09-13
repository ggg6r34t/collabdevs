import express from "express";
import passport from "passport";

import {
  createReplyController,
  deleteReplyController,
  editReplyController,
  getAllReplysController,
} from "../controllers/replyControllers";

const router = express.Router();

router.get("/", getAllReplysController);

// create a new reply (protected route, requires authentication)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createReplyController
);

// edit a reply (protected route, requires authentication)
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  editReplyController
);

// delete a reply by its ID (protected route, requires authentication)
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteReplyController
);

export default router;
