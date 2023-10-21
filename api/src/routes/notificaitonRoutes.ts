import express from "express";
import passport from "passport";

import { createNotificationController } from "../controllers/notificationControllers";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createNotificationController
);

export default router;
