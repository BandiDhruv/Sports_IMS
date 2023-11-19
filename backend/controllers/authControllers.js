import StudentInfo from "../models/StudentDetails.js";
// import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken"

const secret= "dhruv123"
export const authController = {
  checkUserExist: async (req, res) => {
    const { email, password } = req.body;
    try {
      const check = await StudentInfo.findOne({ email });
      console.log(check);
      if (check) {
        const token = generateToken({id: check._id});
        if (password !== check.password) {
          return res.status(401).json({ error: "Invalid password" });
        }

        // Storing token in a cookie named 'token' with httpOnly flag
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
      const data = await StudentInfo.find({});
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
    };

    try {
      const check = await StudentInfo.findOne({ _id: email });
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
};
const generateToken = (id) => {
  return jwt.sign(id,secret,{
      expiresIn:"30d",
  });
};
// import StudentInfo from "../models/StudentDetails.js";
// import generateToken from "../utils/generateToken.js";

// export const authController = {
//   register: async (req, res) => {
//     try {
//       const { name, email, password, address } = req.body;

//       const user = await StudentInfo.findOne({ email });
//       if (user)
//         return res.status(400).json({ msg: "The email already exists." });

//       if (password.length < 6)
//         return res
//           .status(400)
//           .json({ msg: "Password is at least 6 characters long." });

//       // Password Encryption
//       // Here you would use your preferred encryption method. For example:
//       // const passwordHash = await bcrypt.hash(password, 10);

//       const newUser = new StudentInfo({
//         name,
//         email,
//         password, // Replace 'password' with 'passwordHash' if you hash it
//         address,
//       });

//       // Save to MongoDB
//       await newUser.save();

//       // Create tokens
//       const token = generateToken({ id: newUser._id });

//       // Storing token in a cookie named 'token' with httpOnly flag
//       res.cookie("token", token, {
//         httpOnly: true,
//         path: "/", // Set the appropriate path for your application
//         // Add additional options like 'maxAge' if needed
//       });

//       res.json({ token });
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
//   login: async (req, res) => {
//     try {
//       const { email, password } = req.body;

//       const user = await StudentInfo.findOne({ email });
//       if (!user) return res.status(400).json({ msg: "User does not exist." });

//       // Verify password - use your password comparison method (bcrypt.compare, etc.)
//       // For example:
//       // const isMatch = await bcrypt.compare(password, user.password);
//       // Replace the if condition with your password comparison logic

//       // If password matches
//       // if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

//       // Create token
//       const token = generateToken({ id: user._id });

//       // Storing token in a cookie named 'token' with httpOnly flag
//       res.cookie("token", token, {
//         httpOnly: true,
//         path: "/", // Set the appropriate path for your application
//         // Add additional options like 'maxAge' if needed
//       });

//       res.json({ token });
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
//   logout: async (req, res) => {
//     try {
//       // Clear the 'token' cookie
//       res.clearCookie("token", { path: "/" });
//       return res.json({ msg: "Logged out" });
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
//   // Other methods...
// };
