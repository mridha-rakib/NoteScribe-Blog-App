import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/user.model.js";

const updateUserProfile = asyncHandler(async (req, res) => {
  if (req.user._id !== req.params.userId) {
    res.status(401);
    throw new Error("You are not allowed to update this user");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        profilePicture: req.body.profilePicture,
        password: req.body.password,
      },
    },
    { new: true }
  );

  const { password, ...rest } = updatedUser._doc;

  res.status(200).json(rest);
});

export { updateUserProfile };
