import prisma from "../prisma.client.js";

export async function getComments(req, res) {
  const { userId, postId } = req.query;
  const where = {};
  if (userId) where.authorId = Number(userId);
  if (postId) where.postId = Number(postId);
  const comments = await prisma.comment.findMany({ where });
  res.send(comments);
}

export async function createComment(req, res) {
  await prisma.comment.create({
    data: {
      content: req.body.content,
      author: {
        connect: {
          id: Number(req.body.userId),
        },
      },
      post: {
        connect: {
          id: Number(req.body.postId),
        },
      },
    },
  });
  res.send("comment created!");
}

export async function getComment(req, res) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: Number(req.params.commentId),
    },
  });
  res.send(comment);
}

export async function deleteComment(req, res) {
  try {
    const comment = await prisma.delete({
      id: req.params.commentId,
    });
  } catch (error) {}
}
