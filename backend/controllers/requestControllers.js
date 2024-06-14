import RequestInfo from "../models/Requests.js";
import SportsDetails from "../models/Sports.js";
import nodemailer from "nodemailer"
import Mailgen from "mailgen";

const getRequestData = {
    requestedData: async(req,res)=>{
        try{
          const allDetails=await RequestInfo.find({});
          // const quan=await SportsDetails.find({});
          res.status(200).json({message:"success",details:allDetails})
        }catch(err)
        {
          console.error("error fetching request from database",err);
          res.status(500).json({error:"Failed to fetch request details"});
        }
    },
    getStatus: async(req,res)=>{
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
    },
    increment:async (req, res) => {
        const { sportName, itemId } = req.params;
      
        try {
          const sport = await SportsDetails.findOne({ sportName });
          // const reqsport = await RequestInfo.findOne({itemId});
          if (!sport) {
            return res.status(404).json({ message: 'Sport not found' });
          }
      
          const inventoryItem = sport.Inventory.id(itemId);
      
          if (!inventoryItem) {
            return res.status(404).json({ message: 'Item not found in the inventory' });
          }
          // reqsport.itemQuantity+=1;
          inventoryItem.quantityOfSportsEquipment += 1;
      
          await sport.save();
          // await reqsport.save();
          
          
          res.status(200).json({ message: 'Quantity updated successfully', sport });
        } catch (err) {
          console.error('Error updating quantity:', err);
          res.status(500).json({ error: 'Internal server error' });
        }
      },
      decrement:async (req, res) => {
        const { sportName, itemId } = req.params;
        try {
          
          // const reqsport = await RequestInfo.findOne({itemId});
          const sport = await SportsDetails.findOne({ sportName });
      
          if (!sport) {
            return res.status(404).json({ message: 'Sport not found' });
          }
      
          const inventoryItem = sport.Inventory.id(itemId);
      
          if (!inventoryItem) {
            return res.status(404).json({ message: 'Item not found in the inventory' });
          }
          if(inventoryItem.quantityOfSportsEquipment===0){
            console.error("inventory can't be negative")
            return
          }
          // reqsport.itemQuantity-=1;
          inventoryItem.quantityOfSportsEquipment -= 1;
      
          await sport.save();
          // await reqsport.save();
      
          res.status(200).json({ message: 'Quantity updated successfully', sport });
        } catch (err) {
          console.error('Error updating quantity:', err);
          res.status(500).json({ error: 'Internal server error' });
        }
      },
      updateStatus:async (req, res) => {
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
            const reqsport = await RequestInfo.findOneAndUpdate(
              { itemName: sname, itemID: itemId },
              { $inc: { itemQuantity: -1 } }, // Decrement the quantity by 1
              { new: true }
            );
            
      
            if (!sport) {
              return res.status(404).json({ message: 'Sport or inventory item not found' });
            }
          }
      
          res.status(200).json({ message: 'Status and quantity updated successfully', updatedRequest});
          
          await RequestInfo.deleteOne({ _id: requestId });
        } catch (error) {
          console.error('Error updating status and quantity:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },
      sendMail:async (req,res)=>{
        const {senderEmail,recieverEmail,itemName,status}=req.body;
        let config ={
          service:'gmail',
          auth:{
            user:"dhruvbandi03@gmail.com",
            pass:'ggsy qkfb gczv nqec'
          }
        }
        let transporter = nodemailer.createTransport(config);
        
        let MailGenerator = new Mailgen({
          theme: "default",
          product:{
            name: "Mailgen",
            link: 'https://mailgen.js/'
          }

        })
        let response ={
          body:{
            name:recieverEmail,
            intro:`Your request for reserving item ${itemName} has been ${status}`,
            outro:"Thank You"
          }
        }
        let mail=MailGenerator.generate(response);
        let message={
          from: senderEmail, 
          to: recieverEmail, 
          subject:"SIMS Equipment Reservation Systems",
          html:mail
        };
        transporter.sendMail(message).then(()=>{
          return res.status(201).json({mes:"mail sent successfuly"})
        }).catch(err=>{
          console.log(err);
          return res.status(500).json(err)
        })

      }


};

export { getRequestData };