import express from "express";
import { createCommentController } from "../controllers/commentController";
import { isAuthenticated } from "../controllers/userController";

const router = express.Router();

// POST route to create a new comment
router.post("/comments", isAuthenticated, createCommentController);

export default router;
