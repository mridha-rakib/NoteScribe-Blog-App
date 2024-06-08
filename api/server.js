import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
connectDB();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.route.js";

const app = express();
const port = process.env.PORT || 5050;

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

//
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
