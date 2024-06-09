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

  const { _id: userId } = req.user;

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: userId.toString(),
  });

  const savePost = await newPost.save();

  if (savePost) {
    res.status(201).json({
      savePost,
      message: "Post has been created",
    });
  }
});

const getPosts = asyncHandler(async (req, res) => {
  console.log(req.query);

  const {
    userId,
    category,
    slug,
    postId,
    searchTerm,
    startIndex = 0,
    limit = 9,
    order = "desc",
  } = req.query;

  const start = parseInt(startIndex);
  const lim = parseInt(limit);
  const sortDirection = order === "asc" ? 1 : -1;

  const filter = {
    ...(userId && { userId }),
    ...(category && { category }),
    ...(slug && { slug }),
    ...(postId && { _id: postId }),
    ...(searchTerm && {
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { content: { $regex: searchTerm, $options: "i" } },
      ],
    }),
  };

  const now = new Date();
  const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );

  const [posts, totalPosts, lastMonthPosts] = await Promise.all([
    Post.find(filter).sort({ updateAt: sortDirection }).skip(start).limit(lim),
    Post.countDocuments(),
    Post.countDocuments({ createdAt: { $gte: oneMonthAgo } }),
  ]);

  res.status(200).json({
    posts,
    totalPosts,
    lastMonthPosts,
  });
});

export { createPost, getPosts };
