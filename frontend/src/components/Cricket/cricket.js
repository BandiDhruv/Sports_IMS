import React, { useEffect, useState } from 'react';
import "./cricket.css";
import Navbar from '../Navbar/navbar';
import axios from 'axios';

const Cricket = ({sport}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/InventoryDetails")
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="full-box">
      <div className="navbarr"><Navbar /></div>
      <div className="cricket-container">
        {data.filter(item => item.sportName === sport) 
          .map((item, index) => (
            <div key={index} className="card">
              <h1>{item.sportName}</h1>
              <div className="item-heading">
                {/* Render other information from 'item' here */}
              </div>
              <div className="item-quantity">
                {/* Render other information from 'item' here */}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
  
}

export default Cricket;
