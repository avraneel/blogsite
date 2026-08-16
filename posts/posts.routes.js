import { Router } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  getPost,
} from "./posts.controller.js";
import { verifyToken } from "../auth/auth.middleware.js";

const router = Router({ mergeParams: true });

router.get("/", getPosts);
router.post("/", verifyToken, createPost);

router.get("/:postId", getPost);
router.delete("/:postId", verifyToken, deletePost);

export default router;
