import jwt from "jsonwebtoken";
const secret = "dhruv123";


export function authenticateToken(req, res, next) {
  const token = req.cookies.token || req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const user = getUser(token);
  if (!user) {
    return res.status(403).json({ message: "Invalid token" });
  }

  req.user = user;
  next();
}
export function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}
