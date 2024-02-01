import cors from "cors";
import express from "express";
import SportsDetails from "./models/Sports.js";
import SportsInfo from "./data/data.js";
import mongoose from "mongoose";
import router from "./Routes/routes.js";
import cookieParser from "cookie-parser";
// import expressSession from  "express-session";
import session from "express-session";
// const expressSession =require("express-session")

const app = express();
const corsOptions = {
  origin: 'https://sports-ims.vercel.app',
  credentials: 'include', // enable set cookie
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser()); 
app.use(session({
  secret:  'dhruv123',
  resave:false,
  saveUninitialized: false,
  cookie:{secure:true, sameSite:"none"}
}))
const databaseName = "logindetails"; 
mongoose.connect(`mongodb+srv://dhruvbandi:dhruvbandi@cluster0.vfq2isd.mongodb.net/${databaseName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to MongoDB!"); 
});
app.use('/', router);
app.listen(8000,()=>{
    console.log("port connected");
    // SportsDetails.insertMany(SportsInfo); 
})
