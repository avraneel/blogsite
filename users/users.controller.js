import prisma from "../prisma.client.js";
import jwt from "jsonwebtoken";

export async function displayUsers(req, res) {
  const users = await prisma.user.findMany();
  res.send(users);
}

export async function createUser(req, res) {
  await prisma.user.create({
    data: {
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password,
    },
  });
  res.end();
}

export async function getOneUser(req, res) {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(req.params.userId),
    },
  });
  res.send(user);
}

export async function authenticateUser(req, res) {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  console.log(user);
  jwt.sign(user, "private", (err, token) => {
    res.json(token);
  });
}

export async function deleteUser(req, res) {
  try {
    const deletedPosts = await prisma.post.deleteMany({
      where: {
        authorId: Number(req.params.userId),
      },
    });
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.userId),
      },
    });
    res.send({ posts: deletedPosts, user });
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
}

export async function verifyToken(req, res, next) {
  const authorizationHeader = req.get("Authorization");
  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];
    console.log(token);
    next();
  } else {
    res.sendStatus(401);
  }
}
