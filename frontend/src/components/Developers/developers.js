import React,{useEffect} from 'react'
import "./developers.css"
import img from "./free-images.avif"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Navbar from "../Navbar/navbar"
import { useNavigate } from 'react-router-dom';
const Developers = () => {
  return (
      <div className='developer-main'>

       <div className='developer-navbar'>
       <Navbar />
       </div>
      <div className='developer-container_box'>
        
        <h1 className='developer-heading' style={{marginTop:"2rem"}}> MEET OUR TEAM </h1>
        <div className='developer-container'>
        <div className='developer-box'>
          <img src={process.env.PUBLIC_URL + "/assets/Dhruv.jpg"} className='developer-image'/>
          <h3>DHRUV BANDI</h3>
          <span>21ucs065@lnmiit.ac.in</span>
          <p>Developer</p>
          
        </div>

          <div className='developer-box'>
          <img src={img} className='developer-image'/>
          <h3>ABHINAV MIDHA</h3>
          <span>21ucs003@lnmiit.ac.in</span>
          <p>Design</p>
          </div>

          <div className='developer-box' >
          <img src={img} className='developer-image'/>
          <h3>CHANDANDEEP SINGH</h3>
          <span>21ucs049@lnmiit.ac.in</span>
          <p>Design</p>
          </div>

          <div className='developer-box'>
          <img src={process.env.PUBLIC_URL + "/assets/Divyanshi.jpg"} className='developer-image'/>
          <h3>DIVYANSHI AGARWAL</h3>
          <span>21ucs074@lnmiit.ac.in</span>
          <p>Frontend Developer</p>
          </div>

          <div className='developer-box' >
          <img src={img} className='developer-image'/>
          <h3>ANANYA KHADRIA</h3>
          <span>21ucs019@lnmiit.ac.in</span>
          <p>Product Manager</p>
      </div>
        </div>
       

      </div>
      </div>
  )
  }
export default Developers;
