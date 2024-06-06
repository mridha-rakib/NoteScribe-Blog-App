import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/user.model.js";

const updateUserProfile = asyncHandler(async (req, res) => {
  if (req.user._id.toString() !== req.params.userId) {
    res.status(401);
    throw new Error("You are not allowed to update this user");
  }

  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Update the user profile with provided values or fallback to existing values
  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    {
      $set: {
        username: req.body.username || user.username,
        email: req.body.email || user.email,
        profilePicture: req.body.profilePicture || user.profilePicture,
        password: req.body.password || user.password,
      },
    },
    { new: true, runValidators: true }
  );

  const { password, ...rest } = updatedUser._doc;

  res.status(200).json(rest);
});

export { updateUserProfile };
