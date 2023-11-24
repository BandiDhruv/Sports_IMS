import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios

import './AdminPage.css';

const AdminPage = () => {
  const [requestData, setRequestData] = useState([]);
  const [showForm,setShowForm]=useState(false);
  const [newSport, setNewSport] = useState({
    sportName: '',
    inventory: [],
  });
  const [data,setData]=useState({});
  useEffect(() => {
    fetchData();
    getDetails();
  }, []); // Empty dependency array ensures this effect runs only once

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/request-details', { withCredentials: true });

      if (response.status === 200) {
        setRequestData(response.data.details);
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:8000/update-status/${id}`, { status: newStatus }, { withCredentials: true });

      if (response.status === 200) {
        // Fetch updated data after status change
        console.log(response.data);
        fetchData();
      } else {
        console.error('Failed to update status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  async function toggleShowForm(){
    setShowForm(!showForm)
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSport({
      ...newSport,
      [name]: value,
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { sportName, ...itemDetails } = newSport; // Extract sportName from newSport object
      const response = await axios.post(`http://localhost:8000/add-item/${sportName}`, itemDetails, { withCredentials: true });
  
      if (response.status === 201) {
        console.log('New item added successfully!');
        setNewSport({
          sportName: '',
          inventory: [],
        });
        setShowForm(false);
        fetchData();
      } else {
        console.error('Failed to add new item:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  };
  

  async function getDetails() {
    try {
      const response = await axios.get("http://localhost:8000/InventoryData", { withCredentials: true });
      setData(response.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  }
  const uniqueSports = Array.isArray(data) ? Array.from(new Set(data.map(item => item.sportName))) : [];

  console.log(data);
  return (
    <div className='admin-container'>
      <div className="admin-navbar">
        <a href="/manage-items">
          <button className='admin-button'>Manage Items</button>
        </a>
        <button className='admin-button' onClick={toggleShowForm}>Add New Item</button>
      </div>
      
      {showForm && 
      <div className="form-div-admin">

        <form className='add-sport-form' onSubmit={handleSubmit}>
          <button className='close-btn' onClick={toggleShowForm}>X</button>
          <select className='dropdown' name="sportName" value={newSport.sportName} onChange={handleInputChange} required>
            <option  value="">Select a sport <div className="asteric">*</div></option>
            {uniqueSports.map((sport, index) => (
              <option key={index} value={sport}>{sport}</option>
              ))}
          </select>
          <input type="text" name="nameOfSportsEquipment" placeholder='Equipment Name*' value={newSport.inventory.nameOfSportsEquipment} onChange={handleInputChange} required />
          <input type="number" name="quantityOfSportsEquipment" placeholder='Quantity*' value={newSport.inventory.quantityOfSportsEquipment} onChange={handleInputChange} required />
          <input type='text'  name='imageLink' placeholder='Image Link*' value={newSport.inventory.imageLink} onChange={handleInputChange} />
          <button className="admin-button" type="submit">Confirm</button>
        </form>
      </div>
      }

      {!showForm && 
      <div className='admin-items'>
        {requestData.map((item) => (
          <div key={item._id}>
            <img className="admin-item-image" src={item.imageLink} alt="" />
            <p>Item ID: {item.itemID}</p>
            <p>User Email: {item.userEmail}</p>
            <button onClick={() => handleStatusChange(item._id, 'accepted')}>Accept</button>
            <button onClick={() => handleStatusChange(item._id, 'rejected')}>Reject</button>
          </div>
        ))}
      </div>
      }
    </div>
  );
};

export default AdminPage;
