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
      console.log(quantityOfSportsEquipment);
      const newItem = {
        nameOfSportsEquipment:nameOfSportsEquipment,
        quantityOfSportsEquipment:quantityOfSportsEquipment,
        isDamaged:false,
        imageLink:imageLink,
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
    const { itemName,itemID, userEmail, time,imageLink,sportName,itemQuantity } = req.body; 
  
    try {
      const newRequest = {
        sportName:sportName,
        itemID: itemID,
        userEmail: userEmail,
        time: time,
        imageLink:imageLink,
        itemName:itemName,
        itemQuantity:itemQuantity,
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
  },
 
  deleteSportItem: async (req, res) => {
    const { sportName, itemId } = req.params;

    try {
        const query = {
            sportName: sportName,
            "Inventory._id": itemId 
        };
        console.log(query)
        
        const updateResult = await SportsDetails.updateOne(query, { $pull: { Inventory: { _id: itemId } } });

        if (updateResult.nModified === 0) {
            return res.status(404).json({ message: 'Item not found in the inventory' });
        }

        const deleteResult = await InventoryModel.deleteOne({ _id: itemId });

        if (deleteResult.deletedCount === 0) {
            console.error('Error deleting item from the database: Item not found');
        }

        res.status(200).json({ message: 'Inventory item deleted successfully' });
    } catch (err) {
        console.error('Error deleting inventory item:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
},

deleteSport: async (req, res) => {
  const { sportId } = req.params;

  try {
      const deleteResult = await SportsDetails.deleteOne({ _id: sportId });

      if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ message: 'Sport not found' });
      }

      res.status(200).json({ message: 'Sport deleted successfully' });
  } catch (err) {
      console.error('Error deleting sport:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
},



  addSport:async(req,res)=>{
    const sportData=req.body;

    console.log(sportData);
    try{
      const query={
        sportName:await sportData.sportName,
        description:await sportData.description,
        sportImage:await sportData.image,
        Inventory:await sportData.inventory,
      };
      await SportsDetails.insertMany(query);
      res.status(201).json({ message: 'success' });
    }catch(e){
      console.error(e);
      res.status(500).json({error:'Internal server error'});
    }
  }

};

export { getSportsData }; 
