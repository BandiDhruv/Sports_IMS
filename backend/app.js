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
  credentials: true, // enable set cookie
  enablePreflight:true,
  allowedHeaders:["Content-Type","Authorization","Access-Control-Allow-Origin","Access-Control-Request-Headers"]
};
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));
app.options('*',cors(corsOptions));
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
