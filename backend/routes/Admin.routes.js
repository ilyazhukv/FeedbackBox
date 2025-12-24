import express from "express";
import { loginAdmin, registerAdmin, getStats } from "../controllers/adminControllers.js";
import { loginLimiter } from "../middleware/rate-limit.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginLimiter, loginAdmin);
// router.post("/register", registerAdmin);
router.get("/stats", authMiddleware, getStats);

export default router;