import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageItem.css';

const ManageItems = () => {
  const [data, setData] = useState([]);

  async function getDetails() {
    try {
      const response = await axios.get("http://localhost:8000/InventoryDetails", { withCredentials: true });
      setData(response.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  }

  async function increment(sport,id) {
    try {
        console.log(id);
      const res = await axios.patch(`http://localhost:8000/increment-quantity/${sport}/${id}`, {}, { withCredentials: true });
      console.log(res.data); // Check the response
    } catch (err) {
      console.error("Error incrementing quantity", err);
    }
  }
  async function decrement(sport,id) {
    try {
        console.log(id);
      const res = await axios.patch(`http://localhost:8000/decrement-quantity/${sport}/${id}`, {}, { withCredentials: true });
      console.log(res.data); // Check the response
    } catch (err) {
      console.error("Error incrementing quantity", err);
    }
  }
  

  useEffect(() => {
    getDetails();
    increment();
    decrement();
  }, []);

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
      {data.map((sport, index) => (
        <div key={sport._id} className="sport-details">
          <div className="sport-name" onClick={() => toggleDetails(index)}>
            {sport.sportName} <span>{sport.showDetails ? '▲' : '▼'}</span>
          </div>
          {sport.showDetails && (
            <div className="sport-inventory">
              {sport.Inventory.map((item, i) => (
                <div className="sport-inner" key={item._id}>
                  <div className="r1">
                    Equipment:- {item.nameOfSportsEquipment}
                  </div>
                  <div className="r2">
                    Quantity:- <button className='chng-btn' onClick={() => increment(sport.sportName,item._id)}>+</button>
{item.quantityOfSportsEquipment} <button className='chng-btn' onClick={() => decrement(sport.sportName,item._id)}>-</button>
                  </div>
                  <div className="r3">
                    <img className="manage-sport-image" src={item.imageLink} alt="na" />
                  </div>
                </div>
              ))}
            </div>
          )}
          <hr className='ruler' />
        </div>
      ))}
    </div>
  );
};

export default ManageItems;