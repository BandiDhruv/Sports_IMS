import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageItem.css';
import { IoIosArrowDropdownCircle,IoIosArrowDropupCircle } from "react-icons/io";


const ManageItems = () => {
  const [data, setData] = useState([]);

  async function getDetails() {
    try {
      const response = await axios.get("http://localhost:8000/InventoryData", { withCredentials: true });
      setData(response.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  }
  const [temp,setTemp]=useState(0);

  async function increment(sport,id) {
    try {
        console.log(id);
      const res = await axios.patch(`http://localhost:8000/increment-quantity/${sport}/${id}`, {}, { withCredentials: true });
      console.log(res.data); // Check the response
      setTemp(temp+1);
    } catch (err) {
      console.error("Error incrementing quantity", err);
    }
  }
  async function decrement(sport,id) {
    try {
        console.log(id);
      const res = await axios.patch(`http://localhost:8000/decrement-quantity/${sport}/${id}`, {}, { withCredentials: true });
      console.log(res.data); // Check the response
      setTemp(temp-1);
    } catch (err) {
      console.error("Error incrementing quantity", err);
    }
  }
  

  useEffect(() => {
    getDetails();
    // increment();
    // toggleDetails();
    // decrement();
  }, [temp]);

  console.log(data);
  const toggleDetails = (index) => {
    const newData = [...data];
    newData[index].showDetails = !newData[index].showDetails;
    setData(newData);
  };

  return (
    <div className='manage-container'>
      <div className="manage-navbar">
        <a href="/admin">
          <button className='admin-button'>See Requests</button>
        </a>
      </div>
      <div className='manage-sport'>
      {data.map((sport, index) => (
        <div key={sport._id} className="sport-details">
          <div className="sport-name" onClick={() => toggleDetails(index)}>
            {sport.sportName} <span className='toggle-icon'>{sport.showDetails ? <IoIosArrowDropupCircle /> : <IoIosArrowDropdownCircle /> }</span>
          </div>
          {sport.showDetails && (
            <div className="sport-inventory">
              {sport.Inventory.map((item, i) => (

                <div className="sport-inner" key={item._id}>
                   
                  <img className="manage-sport-image" src={item.imageLink} alt="na" />
                  
                  <div className='sport-equipment'> 
                  <div> Equipment :- </div> 
                  <div > {item.nameOfSportsEquipment}</div>
                  </div>
                  
                  <div className='sport-equipment'>
                   <div>Quantity :- </div>
                   <div>
                    <button className='chng-btn' onClick={() => increment(sport.sportName,item._id)}>+</button>
                    </div>
                    <div className='sport-quant'>
                   {item.quantityOfSportsEquipment} 
                  </div>
                  <div>
                  <button className='chng-btn' onClick={() => decrement(sport.sportName,item._id)}>-</button>
                 </div>
                 </div>
                 
                </div>
              ))}
            </div>
          )}
          <hr className='ruler' />
        </div>
      ))}
      </div>
    </div>
  );
};

export default ManageItems;
