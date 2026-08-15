import prisma from "../prisma.client.js";

export async function createPost(req, res) {
  await prisma.post.create({
    data: {
      title: req.body.title,
      content: req.body.content,
      createdAt: new Date(),
      author: {
        connect: {
          id: Number(req.params.userId),
        },
      },
      published: false,
    },
  });
  res.send("Post created!");
}

export async function getAllPostsByUserId(req, res) {
  const posts = await prisma.post.findMany({
    where: {
      authorId: Number(req.params.userId),
    },
  });
  res.send(posts);
}

export async function deletePost(req, res) {
  try {
    const post = await prisma.post.delete({
      where: {
        id: Number(req.params.postId),
      },
    });
    res.send(post);
  } catch (error) {
    res.sendStatus(404);
  }
}
