import { Router } from "express";
import { createComment, getComments } from "./comments.controller.js";

const router = Router();

router.get("/", getComments);
router.post("/", createComment);

export default router;
