import prisma from "../prisma.client.js";

export async function getAllposts(req, res) {
  const posts = await prisma.post.findMany({});
  res.send(posts);
}

export async function getPost(req, res) {
  const posts = await prisma.post.findUnique({
    where: {
      id: req.params.id,
    },
  });
}
