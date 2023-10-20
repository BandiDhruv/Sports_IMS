const mongoose = require("mongoose");

const databaseName = "logindetails"; // Replace with your actual database name
mongoose.connect(`mongodb+srv://dhruvbandi:dhruvbandi@cluster0.vfq2isd.mongodb.net/${databaseName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to MongoDB!"); 
});

// Define a different schema for your data
const studentDetails = new mongoose.Schema({
  // Define fields for your data here
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add more fields as needed
});

// Create a model for your data
const LoginInfo = mongoose.model("logininfo", studentDetails);

module.exports = LoginInfo;
