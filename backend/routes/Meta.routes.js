import express from "express";
import authMiddleware from "../middleware/auth.js";
import { getPostMetaType, getPostMetaStatus } from "../controllers/metaController.js";

const router = express.Router();

router.get("/post", getPostMetaType);
router.get("/post/:id", authMiddleware, getPostMetaStatus);

export default router;