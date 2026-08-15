import { Router } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  getPost,
} from "./posts.controller.js";

const router = Router({ mergeParams: true });

router.get("/", getPosts);
router.post("/", createPost);

router.get("/:postId", getPost);
router.delete("/:postId", deletePost);

export default router;
