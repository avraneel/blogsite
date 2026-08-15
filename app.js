import express from "express";
import usersRouter from "./users/users.routes.js";
import { getAllposts, getPost } from "./posts/allposts.controller.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.get("/posts", getAllposts);

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
