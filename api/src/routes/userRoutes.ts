import { Router } from "express";
import passport from "passport";
import multer from "multer";

import {
  createUserController,
  deleteUserByIdController,
  getUserByIdController,
  getUserListController,
  githubAuthController,
  twitterAuthController,
  googleAuthController,
  logInUserController,
  updateRestrictionController,
  updateRoleController,
  updateUserInfoController,
  uploadAvatarController,
  uploadBannerController,
  logoutUserController,
  changePasswordController,
  requestPasswordResetController,
  resetPasswordController,
} from "../controllers/userControllers";
import adminCheck from "../middlewares/adminCheck";
import verifyToken from "../middlewares/verifyToken";

const router = Router();
const CLIENT_URL = "http://localhost:3000/";

// multer configuration for file name and upload storage location
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const userId = req.params.id;

    // files name after the user's id
    const userDirectory = `./uploads/${userId}/`;

    callback(null, userDirectory);
  },
  filename: (req, file, callback) => {
    // original filename with a timestamp prefix
    const timestamp = new Date().toISOString();
    const originalFilename = file.originalname;

    // timestamp and original filename to create a unique filename
    const uniqueFilename = `${timestamp}-${originalFilename}`;

    // callback function with the filename
    callback(null, uniqueFilename);
  },
});

// multer instance with the configured storage
const upload = multer({ storage });

//get: register user
router.post("/register", createUserController);

//post: login user
router.post("/signin", logInUserController, passport.authenticate("jwt"));

//get: login user
router.post(
  "/signout",
  passport.authenticate("jwt", { session: false }),
  logoutUserController
);

//get: get userbyID
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getUserByIdController
);

//get:  get the list of users
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  getUserListController
);

//put: update a user info
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUserInfoController
);

router.post(
  "/change-password",
  passport.authenticate("jwt", { session: false }),
  changePasswordController
);

router.post(
  "/reset-password",
  passport.authenticate("jwt", { session: false }),
  requestPasswordResetController
);

router.post(
  "/reset-password-confirm",
  passport.authenticate("jwt", { session: false }),
  resetPasswordController
);

// post: user upload avatar
router.post(
  "/:id/upload-avatar",
  upload.single("avatar"),
  passport.authenticate("jwt", { session: false }),
  uploadAvatarController
);

// post: user upload banner
router.post(
  "/:id/upload-banner",
  upload.single("banner"),
  passport.authenticate("jwt", { session: false }),
  uploadBannerController
);

//put: updae role (admin/user)
router.put(
  "/:userId/update-role",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  updateRoleController
);

//put: update restrictions (ban/unban user)
router.put(
  "/:userId/update-restriction",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  updateRestrictionController
);

//delete: delete a user
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  deleteUserByIdController
);

// twitter user
router.get(
  "/auth/twitter",
  passport.authenticate("twitter", { scope: ["profile", "email"] })
);

router.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login",
  }),
  twitterAuthController
);

// github user
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

// google user
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

router.get("/verify", verifyToken);

export default router;
