import "dotenv/config";
import jwt from "jsonwebtoken";

export async function verifyToken(req, res, next) {
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "401 Unauthorized. Token not sent in header" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "403 Forbidden. Token sent is invalid" });
    }
    // only now are you allowed to proceed to the next middleware
    req.user = decoded;
    next();
  });
}

export async function authorizeGetPosts(req, res, next) {
  const { published } = req.query;
  if (published === "true") {
    next();
  } else {
    // next contains the getPosts function so we can pass it
    verifyToken(req, res, next);
  }
}
