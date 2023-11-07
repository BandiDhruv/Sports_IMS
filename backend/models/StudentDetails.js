import mongoose from "mongoose";

const StudentDetails = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const StudentInfo = mongoose.model("studentinfos", StudentDetails);
export default StudentInfo;
