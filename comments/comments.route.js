import { Router } from "express";
import {
  createComment,
  getComments,
  getComment,
  deleteComment,
} from "./comments.controller.js";

const router = Router();

router.get("/", getComments);
router.post("/", createComment);

router.get("/:commentId", getComment);
router.delete("/:commentId", deleteComment);

export default router;
