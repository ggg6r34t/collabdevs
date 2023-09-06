import express from "express";
import {
  createCommentController,
  deleteCommentController,
} from "../controllers/commentController";
import { isAuthenticated } from "../controllers/userController";

const router = express.Router();

// create a new comment (protected route, requires authentication)
router.post("/", isAuthenticated, createCommentController);

// delete a comment by its ID (protected route, requires authentication)
router.delete("/:id", isAuthenticated, deleteCommentController);

export default router;
