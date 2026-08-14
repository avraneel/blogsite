import prisma from "../prisma.client.js";

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
  // TODO add JWT token here
}

export async function getOneUser(req, res) {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(req.params.userId),
    },
  });
  res.send(user);
}
