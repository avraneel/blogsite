import prisma from "../prisma.client.js";

export async function getPosts(req, res) {
  const { userId } = req.query;
  const where = {};
  if (userId) where.authorId = Number(userId);
  const posts = await prisma.post.findMany({ where });
  res.send(posts);
}

export async function createPost(req, res) {
  await prisma.post.create({
    data: {
      title: req.body.title,
      content: req.body.content,
      author: {
        connect: {
          id: Number(req.body.userId),
        },
      },
      published: false,
    },
  });
  res.send("Post created!");
}

export async function getPost(req, res) {
  const posts = await prisma.post.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.send(posts);
}

export async function deletePost(req, res) {
  try {
    const deletedComments = await prisma.comment.deleteMany({
      where: {
        postId: Number(req.params.postId),
      },
    });
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
