import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createPost,
  getPosts,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create-post", protect, admin, createPost);
router.get("/getposts", getPosts);
router.delete("/deletepost/:postId/:userId", protect, deletePost);

export default router;
