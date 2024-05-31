import express from "express";

const router = express.Router();

router.post("/singup", signup);
router.post("/signin", signin);
