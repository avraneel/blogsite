import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPostsByUserId,
} from "./posts.controller.js";

const router = Router({ mergeParams: true });

router.post("/", createPost);
router.get("/", getAllPostsByUserId);
router.delete("/:postId", deletePost);

export default router;
