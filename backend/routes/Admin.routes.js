import express from "express";
import { LogIn, Register } from "../controllers/adminControllers.js";

const router = express.Router();

router.post("/login", LogIn);
router.post("/register", Register);

export default router;