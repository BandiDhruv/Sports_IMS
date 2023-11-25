import RequestInfo from "../models/Requests.js";
import SportsDetails from "../models/Sports.js";

const getRequestData = {
    requestedData: async(req,res)=>{
        try{
          const allDetails=await RequestInfo.find({});
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
      
          if (!sport) {
            return res.status(404).json({ message: 'Sport not found' });
          }
      
          const inventoryItem = sport.Inventory.id(itemId);
      
          if (!inventoryItem) {
            return res.status(404).json({ message: 'Item not found in the inventory' });
          }
      
          inventoryItem.quantityOfSportsEquipment += 1;
      
          await sport.save();
      
          res.status(200).json({ message: 'Quantity updated successfully', sport });
        } catch (err) {
          console.error('Error updating quantity:', err);
          res.status(500).json({ error: 'Internal server error' });
        }
      },
      decrement:async (req, res) => {
        const { sportName, itemId } = req.params;
      
        try {
          
          const sport = await SportsDetails.findOne({ sportName });
      
          if (!sport) {
            return res.status(404).json({ message: 'Sport not found' });
          }
      
          const inventoryItem = sport.Inventory.id(itemId);
      
          if (!inventoryItem) {
            return res.status(404).json({ message: 'Item not found in the inventory' });
          }
          
          inventoryItem.quantityOfSportsEquipment -= 1;
      
          await sport.save();
      
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


};

export { getRequestData };