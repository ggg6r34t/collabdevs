import { Router } from "express";
import passport from "passport";

import {
  createUserController,
  deleteUserByIdController,
  getUserByIdController,
  getUserListController,
  googleAuthenticate,
  logInUserController,
  updateRestrictionController,
  updateRoleController,
  updateUserInfoController,
} from "../controllers/userController";
import adminCheck from "../middlewares/adminCheck";

const router = Router();

//get: register user
router.post("/register", createUserController);

//post: login user
router.post("/login", logInUserController);

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


//google
router.post(
  "/google-login",
  passport.authenticate("google-id-token", { session: false }),
  // user -  from passport
  googleAuthenticate
);

export default router;
