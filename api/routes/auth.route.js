import express from "express";
import { registerUser, authUser } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/singup", registerUser);
router.post("/signin", authUser);

export default router;
