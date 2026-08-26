import { Router } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  getPost,
  updatePost,
} from "./posts.controller.js";
import { authorizeGetPosts, verifyToken } from "../auth/auth.middleware.js";

const router = Router({ mergeParams: true });

router.get("/", authorizeGetPosts, getPosts);
router.post("/", verifyToken, createPost);

router.get("/:postId", getPost);
router.patch("/:postId", verifyToken, updatePost);
router.delete("/:postId", verifyToken, deletePost);

export default router;
