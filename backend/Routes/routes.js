import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { getSportsData } from "../controllers/dataControllers.js";
import { authController } from "../controllers/authControllers.js";
import jwt  from "jsonwebtoken";
import StudentInfo from "../models/StudentDetails.js";
const router = express.Router();
import RequestInfo from "../models/Requests.js";
import SportsDetails from "../models/Sports.js";

router.get("/InventoryDetails", authenticateToken, async (req, res) => {
  try {
    await getSportsData(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ****form for adding a sport item****

router.post("/add-item/:sportName", async (req, res) => {
  const sportName = req.params.sportName;
  const { nameOfSportsEquipment, quantityOfSportsEquipment, isDamaged, imageLink } = req.body;

  try {
    const sport = await SportsDetails.findOne({ sportName });

    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    }
    const newItem = {
      nameOfSportsEquipment,
      quantityOfSportsEquipment,
      isDamaged:false,
      imageLink,
    };
    sport.Inventory.push(newItem);
    await sport.save();

    res.status(201).json({ message: 'New item added to the inventory', sport });
  } catch (error) {
    console.error('Error adding new item:', error);
    res.status(500).json({ error: 'Failed to add new item' });
  }
});



router.get("/InventoryData",async(req,res)=>{
  try{
      const dataa=await SportsDetails.find({});
      if(!dataa)
        res.json("no data in the inventory");
      res.status(200).json(dataa);
  }
  catch(err){
    console.error(err);
    res.status(500).json({error:"INTERNAL SERVER ERROR"});
  }
})

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
  const { itemID, userEmail, time,imageLink,sportName } = req.body; 

  try {
    const newRequest = {
      sportName:sportName,
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
router.patch("/increment-quantity/:sportName/:itemId", async (req, res) => {
  const { sportName, itemId } = req.params;

  try {
    // Find the sport by its name
    const sport = await SportsDetails.findOne({ sportName });

    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    }

    // Find the inventory item within the sport by its ID
    const inventoryItem = sport.Inventory.id(itemId);

    if (!inventoryItem) {
      return res.status(404).json({ message: 'Item not found in the inventory' });
    }

    // Increment the quantity for the found inventory item
    inventoryItem.quantityOfSportsEquipment += 1;

    // Save the changes to the sport document
    await sport.save();

    res.status(200).json({ message: 'Quantity updated successfully', sport });
  } catch (err) {
    console.error('Error updating quantity:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.patch("/decrement-quantity/:sportName/:itemId", async (req, res) => {
  const { sportName, itemId } = req.params;

  try {
    // Find the sport by its name
    const sport = await SportsDetails.findOne({ sportName });

    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    }

    // Find the inventory item within the sport by its ID
    const inventoryItem = sport.Inventory.id(itemId);

    if (!inventoryItem) {
      return res.status(404).json({ message: 'Item not found in the inventory' });
    }

    // Increment the quantity for the found inventory item
    inventoryItem.quantityOfSportsEquipment -= 1;

    // Save the changes to the sport document
    await sport.save();

    res.status(200).json({ message: 'Quantity updated successfully', sport });
  } catch (err) {
    console.error('Error updating quantity:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.patch("/update-status/:id", async (req, res) => {
  const requestId = req.params.id;
  const { status } = req.body;

  try {
    const updatedRequest = await RequestInfo.findByIdAndUpdate(requestId, { status }, { new: true });

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (status === "accepted") {
      const sname = updatedRequest.sportName;
      const itemId = updatedRequest.itemID;

      const sport = await SportsDetails.findOneAndUpdate(
        { sportName: sname, 'Inventory._id': itemId },
        { $inc: { 'Inventory.$.quantityOfSportsEquipment': -1 } }, // Decrement the quantity by 1
        { new: true }
      );

      if (!sport) {
        return res.status(404).json({ message: 'Sport or inventory item not found' });
      }
    }

    // Respond with success message and data
    res.status(200).json({ message: 'Status and quantity updated successfully', updatedRequest});
    
    // Attempt deletion
    await RequestInfo.deleteOne({ _id: requestId });
  } catch (error) {
    console.error('Error updating status and quantity:', error);
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
