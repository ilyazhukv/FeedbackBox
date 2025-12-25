import express from "express";
import {getPostMeta} from "../controllers/metaController.js";

const router = express.Router();

router.get("/", getPostMeta);

export default router;