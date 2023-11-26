import React from 'react';
import { useNavigate} from 'react-router-dom'; 
import "./Error.css"
import Button from '../Home/Button';
const Error = () => {

  const navigate =useNavigate();

 

  async function handleClick(){
    
    if(localStorage.length===0){
      navigate("/");
    }
      
    else
    {
      const role=localStorage.getItem("userRole");
      if(role=== "user"){
        navigate("/home");
      }
      else if(role==="admin"){
        navigate("/admin");
      }
        
      else{
        navigate("/");
      }
    }

  }

  return (
    <div className='error-container'>
       <div>
       <img src={process.env.PUBLIC_URL + "/assets/error.jpg" } alt="errorimg"></img>
       </div>
       
      <div className='error-text'>You are not allowed to access this page. </div>
      <div className='error-link' onClick={handleClick}>
        <Button text="Click here to Go Back" />
      </div>
    </div>
  );
};

export default Error;
 