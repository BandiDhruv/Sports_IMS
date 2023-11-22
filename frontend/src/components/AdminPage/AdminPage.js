import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios

import './AdminPage.css';

const AdminPage = () => {
  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    fetchData();
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
        fetchData();
      } else {
        console.error('Failed to update status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className='admin-container'>
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
    </div>
  );
};

export default AdminPage;
