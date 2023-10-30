// import collection from "./mongo.js";
import cors from "cors";
import express from "express";
import SportsDetails from "./models/Sports.js";
import SportsInfo from "./data/data.js";
import mongoose from "mongoose";
import StudentInfo from "./models/StudentDetails.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/",cors(),(req,res)=>{

})


app.post("/",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await StudentInfo.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

    const data={
        email:email,
        password:password
    }

    try{
        const check=await Student.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await Student.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})

const databaseName = "logindetails"; 
mongoose.connect(`mongodb+srv://dhruvbandi:dhruvbandi@cluster0.vfq2isd.mongodb.net/${databaseName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to MongoDB!"); 
});
app.listen(8000,()=>{
    console.log("port connected");
    // SportsDetails.insertMany(SportsInfo) 
})
