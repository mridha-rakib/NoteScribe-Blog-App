import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { createPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create-post", protect, admin, createPost);

export default router;
