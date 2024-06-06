import express from "express";
const router = express.Router();
import { updateUserProfile, signOut } from "../controller/user.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.put("/update/:userId", protect, updateUserProfile);
router.post("/signout", signOut);
export default router;
