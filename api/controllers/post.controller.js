import Post from "../models/post.model.js";
import asyncHandler from "../middleware/asyncHandler.js";

const createPost = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error("You are not allowed to create a post");
  }

  if (!req.body.title || !req.body.content) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = new Post({
    ...req.body,
    slug,
    useId: req.user.id,
  });

  const savePost = await newPost.save();

  if (savePost) {
    res.status(201).json(savePost);
  }
});

export { createPost };
