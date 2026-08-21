import express from "express";
import cors from "cors";
import usersRouter from "./users/users.routes.js";
import postsRouter from "./posts/posts.routes.js";
import commentsRouter from "./comments/comments.route.js";
import authRouter from "./auth/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
