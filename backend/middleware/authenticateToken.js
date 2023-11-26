import jwt from "jsonwebtoken";
const secret = "dhruv123";
import StudentInfo from "../models/StudentDetails.js";

export const authenticateToken={
  checkToken: async (req, res, next) =>{
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
  },
  verifyToken:async (req, res) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }
  
    try {
      const decode = jwt.verify(token, "dhruv123");
      const check = await StudentInfo.findOne({ _id: decode.id });
      
      if (!check) {
        return res.status(404).json({ message: "Not logged in" });
      }
      
      res.json({ message: "exist"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
export function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}
