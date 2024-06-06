import express from "express";
import {
  registerUser,
  authUser,
  google,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/singup", registerUser);
router.post("/signin", authUser);
router.post("/google", google);

export default router;
