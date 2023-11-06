import express from "express"
import { authController } from "../controllers/authControllers.js";

import { signupController } from "../controllers/signupController.js";

import { dataControllers } from "../controllers/dataControllers.js";

import request from "request"
const router =express.Router();
// router.get("/",cors(),(req,res)=>{

// })
// router.get("/",authController.fetchUserData);
router.get("/InventoryDetails", dataControllers.getSportsData);
// app.get('/api/sports', sportsController.getSportsData);
router.get("/proxy", (req, res) => {
    const imageUrl = req.query.imageUrl;
    console.log(imageUrl);
    // Proxy the request to the Google Drive image
    request(imageUrl).pipe(res);
  });
router.post("/", authController.checkUserExist);
router.post("/signup", signupController.signupUser);

export default router;