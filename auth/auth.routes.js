import { Router } from "express";
import prisma from "../prisma.client.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", authenticateUser);

async function authenticateUser(req, res) {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    res.status(404).json({ message: "email does not exist" });
  }
  jwt.sign(user, process.env.JWT_SECRET, (err, token) => {
    res.json({ token: token });
  });
}

export default router;
