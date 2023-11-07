import express from "express"

import { authController } from "../controllers/authControllers.js";

import { signupController } from "../controllers/signupController.js";

import { dataControllers } from "../controllers/dataControllers.js";

// import jwt from "jsonwebtoken";

const router =express.Router();

// const JWT_SECRET = "your-secret-key"; 
// function authenticateToken(req, res, next) {
//     const token = req.header("authorization");
  
//     if (!token) {
//       return res.status(401).json({ message: "Authentication required" });
//     }
  
//     jwt.verify(token, JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.status(403).json({ message: "Invalid token" });
//       }
//       req.user = user;
//       next();   
//     });
//   }
router.get("/InventoryDetails", dataControllers.getSportsData);
router.get("/home",);
router.post("/", authController.checkUserExist);
router.post("/signup", signupController.signupUser);

export default router;