import express from "express";
import passport from "passport";

import {
  createSharedPostController,
  getSharedPostController,
} from "../controllers/sharedControllers";

const router = express.Router();

router.get("/shares/:postId", getSharedPostController);

router.post(
  "/share/:id",
  passport.authenticate("jwt", { session: false }),
  createSharedPostController
);

export default router;
