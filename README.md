# Blogsite

## API Routes

The routes are as follows:

```
/users
GET     /users              Get all users
POST    /users              Create a user
GET     /users/:userId      Get a user
DELETE  /users/:userId      Delete a user (auth)

/posts
GET     /posts              Get all posts
POST    /posts              Create a post (auth)
GET     /posts/:postId      Get particular post
DELETE  /posts/:postId      Delete a particular post (auth)
GET     /posts?userId=3     Filtering posts by user

/comments
GET     /comments               Get all comments
POST    /comments               Create a comment (auth)
GET     /comments/:commentId    Get a comment
DELETE  /comments/:commentId    Delete a comment (auth)
GET     /comments?postId=X      Filter all comments of a post
GET     /comments?userId=X      Filter all comments of a user

```
