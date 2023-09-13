import express from "express";
import {
  savePostController,
  getSavedPostController,
  removeSavedPostController,
} from "../controllers/savedPostControllers";

const router = express.Router();

// route to save a post
router.post("/save", savePostController);

// route to get saved posts for a user
router.get("/:id", getSavedPostController);

// route to remove a saved post
router.delete("/:userId/:postId", removeSavedPostController);

export default router;
