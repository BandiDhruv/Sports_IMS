import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { getSportsData } from "../controllers/dataControllers.js";
import { authController } from "../controllers/authControllers.js";
// import { signupController } from "../controllers/signupController.js";
import jwt  from "jsonwebtoken";
import StudentInfo from "../models/StudentDetails.js";
const router = express.Router();


router.get("/InventoryDetails", authenticateToken, async (req, res) => {
  try {
    await getSportsData(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/home", authenticateToken)/*, (req, res) => {
  // Access the authenticated user information through req.user
  const authenticatedUser = req.user;

  // Your route logic here
  res.send(`You are authorized, ${authenticatedUser.email}!`); // Example response
});*/
router.get("/api", async (req, res) => {
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
    
    res.json({ message: "exist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", authController.checkUserExist);
router.post("/signup", authController.signupUser);

export default router;
