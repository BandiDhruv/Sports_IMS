import mongoose from "mongoose";

const StudentDetails = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"], 
    default: "user", 
  },
});

const StudentInfo = mongoose.model("studentinfos", StudentDetails);
export default StudentInfo;
