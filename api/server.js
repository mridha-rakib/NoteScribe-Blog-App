import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
connectDB();

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

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
