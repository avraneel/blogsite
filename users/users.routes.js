import { Router } from "express";
import {
  authenticateUser,
  createUser,
  displayUsers,
  getOneUser,
  verifyToken,
  deleteUser,
} from "./users.controller.js";
import postsRouter from "../posts/posts.routes.js";

const router = Router();

router.use("/:userId/posts", postsRouter);

router.get("/", verifyToken, displayUsers);
router.get("/:userId", getOneUser);

router.post("/register", createUser);
router.post("/login", authenticateUser);

router.delete("/:userId", deleteUser);

export default router;
