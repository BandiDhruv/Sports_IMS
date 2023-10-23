import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./loginpage.css";

function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/", {
          email,
          password,
        })
        .then((res) => {
          if (res.data == "exist") {
            history("/home", { state: { id: email } });
          } else if (res.data == "notexist") {
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
    <div className="container">
      <img
        className="bg-img"
        src={process.env.PUBLIC_URL + "/assets/background_image.jpg"}
        alt="bg-img-loader"
      />
      <div className="login-container">
        <h1 className="login-container-heading">Login</h1>
        <hr
          style={{
            marginBottom: "1rem",
            marginTop: "-1rem",
            width: "18rem",
          }}
        />

        <form className="login-form" action="POST">
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <input type="submit" onClick={submit} />
        </form>

        <br />
        <p className="divider" style={{ color: "white" }}>
          Or
        </p>
        <br />

        <div style={{ color: "white" }}>
          {" "}
          Don't have an account?{" "}
          <Link to="/signup" className="link">
            Sign up{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
