import { Router } from "express";
import {
  authenticateUser,
  createUser,
  displayUsers,
  getOneUser,
  verifyToken,
} from "./users.controller.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", authenticateUser);

router.get("/", verifyToken, displayUsers);
router.get("/:userId", getOneUser);

export default router;
