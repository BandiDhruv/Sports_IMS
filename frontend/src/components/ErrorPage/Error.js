import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
// import {img} from "../../../public/assets/error.jpg"
import "./Error.css"
const Error = () => {


  return (
    <div className='error-container'>
       <div>
       <img src={process.env.PUBLIC_URL + "/assets/error.jpg"}></img>
       </div>
       
      <div className='error-text'>You are not allowed to access this page. Please login first </div>
      <div className='error-link'><Link to="/"> Click Here To Login</Link> </div>
    </div>
  );
};

export default Error;
