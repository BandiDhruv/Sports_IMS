import StudentInfo from "../models/StudentDetails.js";

export const authController = {
  checkUserExist: async (req, res) => {
    const { email, password } = req.body;
    try {
      const check = await StudentInfo.findOne({ email: email });
      if (check) {
        res.json("exist");
      } else {
        res.json("notexist");
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
