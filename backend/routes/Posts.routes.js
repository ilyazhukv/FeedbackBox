import express from "express";
import authMiddleware from "../middleware/auth.js";
import {getPosts, createPost, deletePost} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.delete("/:id", authMiddleware, deletePost);

export default router;