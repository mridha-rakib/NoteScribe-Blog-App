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

// const getPosts = asyncHandler(async (req, res) => {
//   const {
//     userId,
//     category,
//     slug,
//     postId,
//     searchTerm,
//     startIndex = 0,
//     limit = 9,
//     order = "desc",
//   } = req.query;

//   const start = parseInt(startIndex);
//   const lim = parseInt(limit);
//   const sortDirection = order === "asc" ? 1 : -1;

//   const filter = {
//     ...(userId && { userId }),
//     ...(category && { category }),
//     ...(slug && { slug }),
//     ...(postId && { _id: postId }),
//     ...(searchTerm && {
//       $or: [
//         { title: { $regex: searchTerm, $options: "i" } },
//         { content: { $regex: searchTerm, $options: "i" } },
//       ],
//     }),
//   };

//   const now = new Date();
//   const oneMonthAgo = new Date(
//     now.getFullYear(),
//     now.getMonth() - 1,
//     now.getDate()
//   );

//   const [posts, totalPosts, lastMonthPosts] = await Promise.all([
//     Post.find(filter).sort({ updateAt: sortDirection }).skip(start).limit(lim),
//     Post.countDocuments(),
//     Post.countDocuments({ createdAt: { $gte: oneMonthAgo } }),
//   ]);

//   res.status(200).json({
//     posts,
//     totalPosts,
//     lastMonthPosts,
//   });
// });

const getPosts = asyncHandler(async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
});

const deletePost = asyncHandler(async (req, res) => {
  console.log(req.user.id);
  console.log(req.params.userId);

  if (req.user.id !== req.params.userId.toString()) {
    return res
      .status(403)
      .json({ message: "You are not allowed to delete this post" });
  }

  await Post.findByIdAndDelete(req.params.postId);

  res.status(200).json("The post has been deleted");
});

export { createPost, getPosts, deletePost };
