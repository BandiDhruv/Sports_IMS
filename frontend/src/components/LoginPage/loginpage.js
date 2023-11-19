import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./loginpage.css";


function Login({setAuth}) {

  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function submit(e) {
    e.preventDefault();
    console.log({email,password});
    try {
      await axios
        .post("http://localhost:8000/", {
          email,
          password,
        },{withCredentials:true})
        .then((res) => {
          if (res.data.message=== "exist") {
            setAuth(true);
            history("/home", { state: { id: email } });
          } else if (res.data.message=== "notexist") {
            alert("User have not sign up");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
  <div className="containerr">
    <div className="box">

    <div className="box1">
            {/* <div className="logo">
              { <img className="login-img"src={process.env.PUBLIC_URL + "/assets/logo1.png"}/> }
              <h1 className="login-img">LNM SPORTS INVENTORY</h1>
            </div> */}
            <div className="lnmiit-logo">
              <img className="lnmiit-img" src={process.env.PUBLIC_URL + "/assets/LNMIIT-LOGO.png"} />
            </div>
      </div>
      
      <div className="box2">
      <div className="login-image-container">
        <img
          className="bg-img1"
          src={process.env.PUBLIC_URL + "/assets/background_image.jpeg"}
          alt="bg-img-loader"
          />
      </div>

      <div className="login-container">
        <h1 className="login-container-heading">Login</h1>
        <div className="login-hr-div">
          <p className="login-hr"></p>
        </div>
        <form className="login-form" action="POST">
         
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            required
            />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            required
          />
          <input type="submit" onClick={submit} />
        </form>
        <div className="login-divider-div">
        <p className="login-divider" style={{ color: "white" }}>
          Or
        </p>
        </div>
        <div className="last-text">
          <p>Don't have an account?</p>
          <Link to="/signup" className="link">
            <p className="link">Sign up</p> 
          </Link>
        </div>
      </div>

    </div>

    </div>
  </div>
  );
}

export default Login;
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import "./loginpage.css";

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function submit(e) {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8000/", {
//         email,
//         password,
//       });

//       if (response.data === "exist") {
//         // Assuming the response contains a token
//         const token = response.data.token; // Adjust based on actual response structure
//         // Store the token in localStorage or sessionStorage
//         localStorage.setItem("token", token);

//         // Redirect to the home page or any authenticated route
//         navigate("/home", { state: { id: email } });
//       } else if (response.data === "notexist") {
//         alert("User has not signed up");
//       }
//     } catch (error) {
//       alert("Wrong details");
//       console.error(error);
//     }
//   }

//   return (
// <div className="containerr">
//     <div className="box">

//     <div className="box1">
//             {/* <div className="logo">
//               { <img className="login-img"src={process.env.PUBLIC_URL + "/assets/logo1.png"}/> }
//               <h1 className="login-img">LNM SPORTS INVENTORY</h1>
//             </div> */}
//             <div className="lnmiit-logo">
//               <img className="lnmiit-img" src={process.env.PUBLIC_URL + "/assets/LNMIIT-LOGO.png"} />
//             </div>
//       </div>
      
//       <div className="box2">
//       <div className="login-image-container">
//         <img
//           className="bg-img1"
//           src={process.env.PUBLIC_URL + "/assets/background_image.jpeg"}
//           alt="bg-img-loader"
//           />
//       </div>

//       <div className="login-container">
//         <h1 className="login-container-heading">Login</h1>
//         <div className="login-hr-div">
//           <p className="login-hr"></p>
//         </div>
//         <form className="login-form" action="POST">
         
//           <input
//             type="email"
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//             placeholder="Email"
//             required
//             />
//           <input
//             type="password"
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//             placeholder="Password"
//             required
//           />
//           <input type="submit" onClick={submit} />
//         </form>
//         <div className="login-divider-div">
//         <p className="login-divider" style={{ color: "white" }}>
//           Or
//         </p>
//         </div>
//         <div className="last-text">
//           <p>Don't have an account?</p>
//           <Link to="/signup" className="link">
//             <p className="link">Sign up</p> 
//           </Link>
//         </div>
//       </div>

//     </div>

//     </div>
//   </div>
//   );
// }

// export default Login;
