import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { getSportsData } from "../controllers/dataControllers.js";
import { authController } from "../controllers/authControllers.js";
import { getRequestData } from "../controllers/requestControllers.js";

const router = express.Router();

//route for getting the inventory details
router.get("/InventoryDetails", authenticateToken.checkToken, getSportsData.getInventoryDetails);

// route form for adding a sport item
router.post("/add-item/:sportName", getSportsData.addItem);

// route for getting data for managing-items (admin only)
router.get("/InventoryData",getSportsData.getInventoryData)

// route for home with jwt authentication
router.get("/home", authenticateToken.checkToken);

//route for verifying token
router.get("/api",authenticateToken.verifyToken );

// route for getting role of the logged in user
router.get("/role",authController.getRole);

// route for reserving an equipment
router.post("/reserve",getSportsData.reserveItem);

// route for getting the requested data
router.get("/request-details",getRequestData.requestedData)

// router for getting the status (pending ,accepted ,rejected)
router.get("/get-status/:userEmail",getRequestData.getStatus)

// route for increasing quantity 
router.patch("/increment-quantity/:sportName/:itemId",getRequestData.increment );

// route for decreasing quantity
router.patch("/decrement-quantity/:sportName/:itemId", getRequestData.decrement);

// route for getting updated status (accepted, rejected)
router.patch("/update-status/:id", getRequestData.updateStatus);

//route for user to login
router.post("/", authController.loginUser);

//route for user to signup
router.post("/signup", authController.signupUser);

// route for user to logout
router.get("/logout",authController.logoutUser);

export default router;
