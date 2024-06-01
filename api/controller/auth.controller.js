import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user & get token
// @route POST /api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } else {
    res.status(401);
    throw new Error("Invalid login credentials");
  }
});

// @desc Register user
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
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

export { registerUser, authUser };
