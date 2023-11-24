import StudentInfo from "../models/StudentDetails.js";
import jwt from "jsonwebtoken"

const secret= "dhruv123"
export const authController = {
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const check = await StudentInfo.findOne({ email });
      console.log(check);
      if (check) {
        const token = generateToken({
          id: check._id,
          email: check.email,
          role: check.role 
        });
        console.log(token);
        if (password !== check.password) {
          return res.status(401).json({ error: "Invalid password" });
        }
        res.cookie("token", token, { httpOnly: true ,maxAge: 24*60*60*1000});
        
        return res.json({message: "exist",token: token});
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
    const data = {
      name: name,
      email: email,
      password: password,
      role:"user"
    };

    try {
      const check = await StudentInfo.findOne({ email });
      if (check) {
        res.json({message: "exist"});
      } else {
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
    expiresIn: '30m',
  });
};
