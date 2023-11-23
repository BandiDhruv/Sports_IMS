import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { getSportsData } from "../controllers/dataControllers.js";
import { authController } from "../controllers/authControllers.js";
import jwt  from "jsonwebtoken";
import StudentInfo from "../models/StudentDetails.js";
const router = express.Router();
import RequestInfo from "../models/Requests.js";

router.get("/InventoryDetails", authenticateToken, async (req, res) => {
  try {
    await getSportsData(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/home", authenticateToken);
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
    
    res.json({ message: "exist" ,userData: check});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/role",(req,res)=>{
  const roles=authController.fetchUserData;
  if(!roles)
  {
    res.json("No role found");
  }
  res.json(roles.role);
})
router.post("/reserve", async (req, res) => {
  const { itemID, userEmail, time,imageLink } = req.body; 

  try {
    const newRequest = {
      itemID: itemID,
      userEmail: userEmail,
      time: time,
      imageLink:imageLink
    };

    await RequestInfo.insertMany([newRequest]);

    res.status(201).json({ message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to save request' });
  }
});

router.get("/request-details",async(req,res)=>{
  try{
    const allDetails=await RequestInfo.find({});
    res.status(200).json({message:"success",details:allDetails})
  }catch(err)
  {
    console.error("error fetching reuest from database",err);
    res.status(500).json({error:"Failed to fetch request details"});
  }
})
router.get("/get-status/:userEmail",async(req,res)=>{
  try{
    const email=req.params.userEmail;
  
    const allDetails=await RequestInfo.find({userEmail:email});
    if(!allDetails)
      res.status(100).json("NO data ");
    res.status(200).json({message:"success",details:allDetails});
  }
  catch(err)
  {
    console.error("error getting status from database",err);
    res.status(500).json({error:"Failed to get status details"});
  }
})


router.patch("/update-status/:id", async (req, res) => {
  const requestId = req.params.id;
  const { status } = req.body;

  try {
    const updatedRequest = await RequestInfo.findByIdAndUpdate(requestId, { status }, { new: true });

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', updatedRequest });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.post("/", authController.checkUserExist);
router.post("/signup", authController.signupUser);
router.get("/logout",(req,res) => {
  res.clearCookie("token");
  res.status(200).json({ message: 'Logged out successfully' });
});
export default router;
