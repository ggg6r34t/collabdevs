import { Router } from "express";
import passport from "passport";

import {
  githubAuthController,
  twitterAuthController,
  googleAuthController,
  logInUserController,
  logoutUserController,
  changePasswordController,
  requestPasswordResetController,
  resetPasswordController,
} from "../controllers/authControllers";

const router = Router();

let CLIENT_URL: string | undefined;

if (process.env.NODE_ENV === "development") {
  CLIENT_URL = process.env.DEV_ORIGIN;
} else if (process.env.NODE_ENV === "production") {
  CLIENT_URL = process.env.PROD_ORIGIN;
}

//post: login user
router.post("/signin", logInUserController, passport.authenticate("jwt"));

//get: logout user
router.post(
  "/signout",
  passport.authenticate("jwt", { session: false }),
  logoutUserController
);

// change user password
router.post(
  "/change-password/:id",
  passport.authenticate("jwt", { session: false }),
  changePasswordController
);

// request password reset
router.post(
  "/reset-password",
  passport.authenticate("jwt", { session: false }),
  requestPasswordResetController
);

// confirm password reset
router.post(
  "/reset-password-confirm",
  passport.authenticate("jwt", { session: false }),
  resetPasswordController
);

// twitter authentication
router.get(
  "/auth/twitter",
  passport.authenticate("twitter", { scope: ["profile", "email"] })
);

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login",
  }),
  twitterAuthController
);

// gitHub authentication
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["profile", "email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login",
  }),
  githubAuthController
);

// google authentication
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login",
  }),
  googleAuthController
);

export default router;
