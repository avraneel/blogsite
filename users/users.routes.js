import { Router } from "express";
import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
} from "./users.controller.js";
import postsRouter from "../posts/posts.routes.js";
import { verifyToken } from "../auth/auth.middleware.js";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUser);

router.post("/", createUser);

router.delete("/:userId", verifyToken, deleteUser);

export default router;
