import jwt from "jsonwebtoken";
const secret = "dhruv123";

export function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}
