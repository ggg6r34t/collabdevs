import { Router } from "express";
import passport from "passport";
import multer from "multer";

import {
  createUserController,
  deleteUserByIdController,
  getUserByIdController,
  getUserListController,
  updateRestrictionController,
  updateRoleController,
  updateUserInfoController,
  uploadAvatarController,
  uploadBannerController,
} from "../controllers/userControllers";
import adminCheck from "../middlewares/adminCheck";

const router = Router();

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
  // adminCheck, // lets think of what to do here so users can search other users
  getUserListController
);

//put: update user info
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUserInfoController
);

// post: user uploads avatar
router.post(
  "/:id/upload-avatar",
  upload.single("avatar"),
  passport.authenticate("jwt", { session: false }),
  uploadAvatarController
);

// post: user uploads banner
router.post(
  "/:id/upload-banner",
  upload.single("banner"),
  passport.authenticate("jwt", { session: false }),
  uploadBannerController
);

//put: update user role (admin/user)
router.put(
  "/:userId/update-role",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  updateRoleController
);

//put: update user restrictions (ban/unban user)
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

export default router;
