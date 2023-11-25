import SportsDetails from '../models/Sports.js';
import RequestInfo from '../models/Requests.js';


const getSportsData = {
  getData: async (req, res) => {
    try {
      const sportsData = await SportsDetails.find({});
      res.json(sportsData);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getInventoryData: async(req,res)=>{
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
  },
  addItem:async (req, res) => {
    const sportName = req.params.sportName;
    const { nameOfSportsEquipment, quantityOfSportsEquipment, imageLink } = req.body;
  
    try {
      const sport = await SportsDetails.findOne({ sportName });
  
      if (!sport) {
        return res.status(404).json({ message: 'Sport not found' });
      }
      const newItem = {
        nameOfSportsEquipment:nameOfSportsEquipment,
        quantityOfSportsEquipmen:quantityOfSportsEquipment,
        isDamaged:false,
        imageLi:imageLink,
      };
      sport.Inventory.push(newItem);
      await sport.save();
  
      res.status(201).json({ message: 'New item added to the inventory', sport });
    } catch (error) {
      console.error('Error adding new item:', error);
      res.status(500).json({ error: 'Failed to add new item' });
    }
  },
  reserveItem: async (req, res) => {
    const { itemName,itemID, userEmail, time,imageLink,sportName } = req.body; 
  
    try {
      const newRequest = {
        sportName:sportName,
        itemID: itemID,
        userEmail: userEmail,
        time: time,
        imageLink:imageLink,
        itemName:itemName
      };
  
      await RequestInfo.insertMany([newRequest]);
  
      res.status(201).json({ message: 'success' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to save request' });
    }
  },
  getInventoryDetails:async (req, res) => {
    try {
      await getSportsData.getData(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export { getSportsData }; 
