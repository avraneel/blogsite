import { Router } from "express";
import { createUser, displayUsers, getOneUser } from "./users.controller.js";

const router = Router();

router.post("/", createUser);

router.get("/", displayUsers);
router.get("/:userId", getOneUser);

export default router;
