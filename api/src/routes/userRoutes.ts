import { Router } from "express";
import passport from "passport";

import {
  createUserController,
  deleteUserByIdController,
  getUserByIdController,
  getUserListController,
  logInUserController,
  updateRestrictionController,
  updateRoleController,
  updateUserInfoController,
} from "../controllers/userController";
import adminCheck from "../middlewares/adminCheck";

const router = Router();

//register
router.post("/register", createUserController);

//login
router.post("/login", logInUserController);

// get userbyID
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getUserByIdController
);

// get the list of users
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  getUserListController
);

//update a user info
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUserInfoController
);

//put: updae role
router.put(
  "/:userId/update-role",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  updateRoleController
);

//put: update ristrictions
router.put(
  "/:userId/toggle-ristriction",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  updateRestrictionController
);

// delete a user
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  deleteUserByIdController
);

export default router;
