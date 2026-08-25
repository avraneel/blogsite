import prisma from "../prisma.client.js";

export async function getPosts(req, res) {
  const { userId } = req.query;
  const where = {};
  if (userId) where.authorId = Number(userId);
  const posts = await prisma.post.findMany({
    where,
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
  res.json(posts);
}

export async function createPost(req, res) {
  const { id, ...details } = req.user;
  try {
    await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        author: {
          connect: { id },
        },
        published: false,
      },
    });
    res.status(201).json({ message: "Created" });
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function getPost(req, res) {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(req.params.postId),
    },
  });
  res.json(post);
}

export async function updatePublish(req, res) {
  const published = req.body.published === "false" ? false : true;
  try {
    await prisma.post.update({
      where: {
        id: Number(req.params.postId),
      },
      data: {
        published: published,
      },
    });
    res.status(200).json({ message: "updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function deletePost(req, res) {
  const { id, ...details } = req.user;
  const author = prisma.post.findUnique({
    where: {
      id: Number(req.params.postId),
    },
  });
  if (!author || id !== author.authorId) {
    return res
      .status(403)
      .json({ message: "You cannot delete someone else's post!" });
  }
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
    res.json(post);
  } catch (error) {
    res.sendStatus(404);
  }
}
