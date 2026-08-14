# Blogsite

## API Routes

The routes are as follows:

| Method   | Route                                | Description                                  | Authorization             | Status |
| -------- | ------------------------------------ | -------------------------------------------- | ------------------------- | ------ |
| `GET`    | `/users`                             | Return a list of all users                   |                           | Done   |
| `POST`   | `/users`                             | Create a user                                |                           | Done   |
| `GET`    | `/users/:userId`                     | Return the details of user with id `userId`  |                           | Done   |
| `GET`    | `/posts`                             | Read all posts                               | published ones are public |        |
| `GET`    | `/posts/:postId`                     | Read post with id `postId`                   |                           |        |
| `GET`    | `/comments`                          | Read all comments                            |                           |        |
| `GET`    | `/comments/:commentId`               | Read comment with id `commentId`             |                           |        |
| `DELETE` | `/comments/:commentId`               | Delete comment with id `commentId`           |                           |        |
| `GET`    | `/users/:userId/posts`               | Read all posts by user with id `userId`      |                           |        |
| `POST`   | `/users/:userId/posts`               | Create a post by user with id `userId`       |                           |        |
| `DELETE` | `/users/:userId/posts/:postId`       | Delete a post by user with id `userId`       |                           |        |
| `GET`    | `/users/:userId/comments`            | Return all comments by user with id `userId` |                           |        |
| `POST`   | `/users/:userId/comments`            | Create a comment by user with id `userId`    |                           |        |
| `DELETE` | `/users/:userId/comments/:commentId` | Delete a comment by user with id `userId`    |                           |        |

## How will the users authenticate:

In post request, send the email, fullname and password in the body
