import express from "express";
import authMiddleware from "../middleware/auth.js";
import { getComment, createComment, deleteComment } from "../controllers/commentsController.js";

const router = express.Router();

router.get("/:id", getComment);
router.post("/:id", createComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;