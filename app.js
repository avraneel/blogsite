import express from "express";
import usersRouter from "./users/users.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
