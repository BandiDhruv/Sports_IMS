import StudentInfo from "../models/StudentDetails.js";

export const signupController = {
  signupUser: async (req, res) => {
    const { email, password } = req.body;
    const data = {
      email: email,
      password: password,
    };
    try {
      const check = await StudentInfo.findOne({ email: email });
      if (check) {
        res.json("exist");
      } else {
        res.json("notexist");
        await StudentInfo.insertMany([data]);
      }
    } catch (e) {
      res.json("fail");
    }
  },
};
