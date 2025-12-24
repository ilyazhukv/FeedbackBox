import express from "express";
import authMiddleware from "../middleware/auth.js";
import { getPost, getPosts, createPost, deletePost, updateStatus } from "../controllers/postController.js";
import { apiLimiter } from "../middleware/rate-limit.js";

const router = express.Router();

router.get("/:id", getPost)
router.get("/", getPosts);
router.post("/", apiLimiter, createPost);
router.put("/update/:id", authMiddleware, updateStatus);
router.delete("/delete/:id", authMiddleware, deletePost);

export default router;