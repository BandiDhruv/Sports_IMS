import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./signuppage.css";

function Signup() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      await axios
        .post("http://localhost:8000/signup", {
          email,
          password,
        })
        .then((res) => {
          if (res.data === "exist") {
            alert("User already exists");
          } else if (res.data === "notexist") {
            history("/home", { state: { id: email } });
          }
        })
        .catch((e) => {
          alert("Wrong details");
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
      <div className="signup-container">
        <h1 className="signup-container-heading">Signup</h1>
        <hr
          style={{
            marginBottom: "1rem",
            marginTop: "-1rem",
            width: "17.5rem",
          }}
        />
        <form className="signup-form" action="POST">
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
          <input
            type="password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="Confirm Password"
          />
          <input type="submit" onClick={submit} />
        </form>
        <br />
        <p className="divider" style={{ color: "white" }}>
          Or
        </p>
        <br />
        <div style={{ color: "white" }}>
          Already have an account?{" "}
          <Link to="/" className="link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
