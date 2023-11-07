import StudentInfo from "../models/StudentDetails.js";
// import jwt from "jsonwebtoken";

export const authController = {
  checkUserExist: async (req, res) => {
    const { email, password } = req.body;
    try {
      const check = await StudentInfo.findOne({ email: email });
      if (check) {
        // const token =jwt.sign({email:check.email,},"secret123",)
        // console.log(token);
        return res.json("exist");
      } else {
        return res.json( "notexist")
      }
    } catch (e) {
      res.json("fail");
    }
  },
  fetchUserData: async (req,res) =>{
    try{
      const data=await StudentInfo.find({});
      res.json(data);
    }
    catch(e){
      res.json("fail");
    }
  }
};
//  export default authController;
