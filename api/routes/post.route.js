import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create-post", protect, admin, createPost);
router.get("/getposts", getPosts);
router.delete("/deletepost/:postId/:userId", protect, deletePost);
router.put("/updatepost/:postId/:userId", protect, admin, updatePost);

export default router;
