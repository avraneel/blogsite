import "dotenv/config";
import jwt from "jsonwebtoken";
import prisma from "../prisma.client.js";

export async function getUsers(req, res) {
  const users = await prisma.user.findMany();
  res.json(users);
}

export async function createUser(req, res) {
  try {
    await prisma.user.create({
      data: {
        email: req.body.email,
        fullname: req.body.fullname,
        password: req.body.password,
      },
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

export async function getUser(req, res) {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(req.params.userId),
    },
  });
  res.json(user);
}

export async function deleteUser(req, res) {
  const { id, ...details } = req.user;
  if (id !== req.params.userId) {
    return res.status(403).json({
      message: "You are not allowed to remove someone else's account!",
    });
  }
  try {
    const deletedPosts = await prisma.post.deleteMany({
      where: {
        authorId: id,
      },
    });
    const user = await prisma.user.delete({
      where: { id },
    });
    res.json({ posts: deletedPosts, user });
  } catch (error) {
    res.sendStatus(404);
  }
}
