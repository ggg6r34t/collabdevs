import express from "express";
import {
  createCommentController,
  deleteCommentController,
} from "../controllers/commentController";
import { isAuthenticated } from "../controllers/userController";

const router = express.Router();

// POST route to create a new comment
router.post("/api/comments", isAuthenticated, createCommentController);
router.delete("/api/comments", isAuthenticated, deleteCommentController);

export default router;
