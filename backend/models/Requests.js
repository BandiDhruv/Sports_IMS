import mongoose from "mongoose";

const RequestDetails = new mongoose.Schema({
  itemID: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  itemName:{
    type:String,
    required:true,
  },
  itemQuantity:{
    type:Number,
    required:true,
  },
  status: {
    type: String,
    enum: ["accepted", "pending", "rejected"], 
    default: "pending", 
  },
  time:{
    type: Date,
    required: true,
    expires: 3600,//in seconds
  },
  imageLink:{
    type:String,
    required:true,
  },
  sportName:{
    type:String,
    required:true,
  }
});

const RequestInfo = mongoose.model("requestinfos", RequestDetails);
export default RequestInfo;
