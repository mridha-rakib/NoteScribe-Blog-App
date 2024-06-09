import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { createPost, getPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create-post", protect, admin, createPost);
router.get("/getposts", getPosts);

export default router;
