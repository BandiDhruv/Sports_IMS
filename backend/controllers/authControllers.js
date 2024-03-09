import StudentInfo from "../models/StudentDetails.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const secret= "dhruv123"
export const authController = {
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const check = await StudentInfo.findOne({ email });
      if(!check)
      {
        return res.json({message: "notexist"});
      }
      console.log(check);
      const checkDomain=email.split("@").pop();
      if(checkDomain!=="lnmiit.ac.in")
      {
        return res.json({error: "Invalid email"});
      }
      const isPasswordMatch = await bcrypt.compare(password, check.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
      if (check) {
        const token = generateToken({
          id: check._id,
          email: check.email,
          role: check.role 
        });
        console.log(token);

        res.cookie("token", token, { maxAge: 24*60*60*1000, sameSite:"none",secure:"true"});
        
        return res.json({message: "exist",token: token,data: check});
      } else {
        return res.json({message: "notexist"});
      }
    } catch (e) {
      res.json("fail");
    }
  },
  fetchUserData: async (req, res) => {
    try {
      const data = await StudentInfo.findone({});
      res.json(data);
    } catch (e) {
      res.json("fail");
    }
  },
  signupUser: async (req, res) => {
    const { email, password, name } = req.body;
    const hashedPassword =await bcrypt.hash(password,10);
    const data = {
      name: name,
      email: email,
      password: hashedPassword,
      role:"user"
    };

    try {
      const check = await StudentInfo.findOne({ email });
      if (check) {
        res.json({message: "exist"});
      } 

      const checkDomain=email.split("@").pop();
      if(checkDomain!=="lnmiit.ac.in")
      {
        return res.json({error: "Invalid email"});
      }else {
        res.json({message: "notexist"});
        await StudentInfo.insertMany([data]);
      }
    } catch (e) {
      res.json("fail");
    }
  },
  logoutUser: async (req, res) => { 
    res.clearCookie("token");
    res.status(200).json({ message: 'Logged out successfully' });
  },
  getRole: async (req,res)=>{
    const roles=authController.fetchUserData;
    if(!roles)
    {
      res.json("No role found");
    }
    res.json(roles.role);
  }
};
const generateToken = (user) => {
  return jwt.sign(user, secret, {
    expiresIn: '30h',
  });
};
