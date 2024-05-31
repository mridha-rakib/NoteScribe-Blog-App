import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/user.model.js";

const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await User.create({ username, email, password });

  if (user) {
    res.json("Signup successful");
  }
});

export { signup };
