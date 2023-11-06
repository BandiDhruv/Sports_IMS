import mongoose from "mongoose";

const Sports = new mongoose.Schema({
  sportName: {
    type: String,
    // required: true,
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
