import express from "express";
import authMiddleware from "../middleware/auth.js";
import { getComments, createComment, deleteComment } from "../controllers/commentController.js";

const router = express.Router();

router.get("/:id", getComments);
router.post("/:id", authMiddleware, createComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;