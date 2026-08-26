import { Router } from "express";
import {
  createComment,
  getComments,
  getComment,
  deleteComment,
  updateComment,
} from "./comments.controller.js";
import { verifyToken } from "../auth/auth.middleware.js";

const router = Router();

router.get("/", getComments);
router.post("/", verifyToken, createComment);

router.get("/:commentId", getComment);
router.patch("/:commentId", verifyToken, updateComment);
router.delete("/:commentId", verifyToken, deleteComment);

export default router;
