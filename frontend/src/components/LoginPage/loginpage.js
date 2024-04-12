import React, { useState } from "react";
// import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./loginpage.css";
import useAxios from "../../hooks/useAxios";

function Login({ setAuth }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const axios=useAxios()
  const checkElapsedTime = () => {
    const loginTime = localStorage.getItem('loginTime');
    if (loginTime) {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - parseInt(loginTime, 10);
      const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
  
      if (elapsedTime >= thirtyMinutes) {
        // Logout logic - call your logout route or perform logout actions
        logoutUser();
      }
    }
  };
  const logoutUser = () => {
    localStorage.removeItem('loginTime');
    window.localStorage.clear();
  };
  const startLogoutTimer = () => {
    setInterval(checkElapsedTime, 60000*15); 
  };

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("https://sports-ims.onrender.com/", {
        email,
        password,
      },{withCredentials: true}/*, { withCredentials: true }*/);

      if (response.data.message === "exist") {
        const ls=response.data.data;
        localStorage.setItem("auth",true);
        localStorage.setItem("userID",ls._id)
        localStorage.setItem("auth",true)
        localStorage.setItem("userEmail",ls.email)
        localStorage.setItem("userRole",ls.role)
        localStorage.setItem("authtoken",response.data.token)

        const loginTime = new Date().getTime();
        localStorage.setItem("loginTime",loginTime);
        setAuth(true);
        const role=localStorage.getItem("userRole");
        startLogoutTimer();

        console.log(role);
          if(role==="user"){
            navigate("/home");
            toast.success("succesfull signed in");
          }
          else if(role==="admin"){
            navigate("/admin");
            toast.success("succesfull signed in");
          }
          else
          {
            toast.error("Oops an error occured");
            navigate("*")
          }
      } else if (response.data.message === "notexist") {
        toast.error("User not registered");
      } else if (response.data.error === "Invalid email") {
        toast.error("Please sign in through registered lnmiit email only");
      } else if (response.data.error === "Invalid password") {
        toast.error("Incorrect password");
      }
    } catch (error) {
      toast.error("Wrong details");
      console.error(error);
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
              <img className="lnmiit-img" alt="na" src={process.env.PUBLIC_URL + "/assets/LNMIIT-LOGO.png"} />
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
    <ToastContainer />
  </div>
  );
}

export default Login;