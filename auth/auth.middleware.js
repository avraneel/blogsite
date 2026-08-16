import "dotenv/config";
import jwt from "jsonwebtoken";

export async function verifyToken(req, res, next) {
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Token not sent in header" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Forbidden. Token sent is invalid" });
    }
    // only now are you allowed to proceed to the next middleware
    req.user = decoded;
    next();
  });
}
