import prisma from "../prisma.client.js";

export async function getComments(req, res) {
  const { userId, postId } = req.query;
  const where = {};
  if (userId) where.authorId = Number(userId);
  if (postId) where.postId = Number(postId);
  const comments = await prisma.comment.findMany({
    where,
    select: {
      id: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          fullname: true,
          password: false,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.json(comments);
}

export async function createComment(req, res) {
  const { id, ...details } = req.user;
  await prisma.comment.create({
    data: {
      content: req.body.content,
      author: {
        connect: { id },
      },
      post: {
        connect: {
          id: Number(req.body.postId),
        },
      },
    },
  });
  res.status(201).json({ message: "Comment Created" });
}

export async function getComment(req, res) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: Number(req.params.commentId),
    },
  });
  if (comment) {
    res.json(comment);
  } else {
    res.sendStatus(404);
  }
}

export async function deleteComment(req, res) {
  const { id, ...details } = req.user;
  const author = await prisma.comment.findUnique({
    where: {
      id: Number(req.params.commentId),
    },
    select: {
      authorId: true,
    },
  });
  if (!author || id !== author.authorId) {
    return res
      .status(403)
      .json({ message: "You cannot delete someone else's comment!" });
  }
  try {
    const comment = await prisma.comment.delete({
      where: {
        id: Number(req.params.commentId),
      },
    });
    res.json(comment);
  } catch (error) {
    res.sendStatus(404);
  }
}
