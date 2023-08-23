import express from "express";
import { createComment } from "../controllers/linkController";
import { isAuthenticated } from "../controllers/userController";

const router = express.Router();

router.post("/comments", isAuthenticated, createComment);

export default router;
