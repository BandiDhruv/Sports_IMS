import mongoose from "mongoose";

const Sports = new mongoose.Schema({
  sportName: {
    type: String,
    required:true,
  },
  description:{
    type:String,
    default:"No Discription",
  },
  sportImage:{
    type:String,
    default:"https://i.postimg.cc/wMrwsG2R/loremipsum.webp",
  },
  Inventory: [{
    nameOfSportsEquipment: { type: String },
    quantityOfSportsEquipment: { type: Number },
    isDamaged: { type: Boolean },
    imageLink:{type: String}
  }]
});

const SportsDetails = mongoose.model("InventoryDetails", Sports);
export default SportsDetails;
