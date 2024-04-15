import React, { useState,useEffect } from 'react'
import useAxios from '../../../hooks/useAxios';
import { toast } from 'react-toastify';
const AddItem = (props) => {
    console.log(props);
    const [data, setData]=useState();
    const [newSport, setNewSport] = useState({
        sportName: "",
        nameOfSportsEquipment:"",
        quantityOfSportsEquipment:"",
        imageLink:"",
      });

      const [requestData, setRequestData] = useState([]);
      useEffect(() => {
        fetchData();
        getDetails();
      }, []);
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://sports-ims.onrender.com/request-details",{withCredentials: true}
          );
    
          if (response.status === 200) {
            for (let i = 0; i < response.data.details.length; i++) {
              let hour = 0;
              const currTime = response.data.details[i].time;
              const newTime = currTime.slice(-13, -8);
              let minutes = parseInt(newTime.split(":").pop());
              if (minutes + 30 >= 60) {
                hour = hour + 1;
              }
              minutes = (minutes + 30) % 60;
              let sMinutes=minutes.toString();
              if(sMinutes.length===1)
              {
                sMinutes= '0' + sMinutes;
              }
              const hours = parseInt(newTime.slice(-5, -3));
              hour = (hour + hours + 5) % 24;
              let sHour=hour.toString();
              if(sHour.length===1)
              {
                sHour= '0' + sHour;
              }
              const timeStore = sHour + ":" + sMinutes;
              response.data.details[i].time = timeStore;
            }
            setRequestData(response.data.details);
          } else {
            console.error("Failed to fetch data:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      const axios=useAxios();
      async function getDetails() {
        try {
          const response = await axios.get("https://sports-ims.onrender.com/InventoryData",{withCredentials: true});
          setData(response.data);
        } catch (err) {
          console.error("Error fetching data", err);
        }
      }
      const uniqueSports = Array.isArray(data)
      ? Array.from(new Set(data.map((item) => item.sportName)))
      : [];
      async function toggleShowForm() {
        props.setShowForm(!props.showForm);
      }
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSport({
          ...newSport,
          [name]: value,
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { sportName, ...itemDetails } = newSport;
          console.log(newSport);
          const response = await axios.post(
            `https://sports-ims.onrender.com/add-item/${sportName}`,itemDetails,{withCredentials: true},
    
          );
    
          if (response.status === 201) {
            setNewSport({
              sportName: "",
              inventory: [],
            });
            props.setShowForm(false);
            toast.success("Successfully added new sport!");
            fetchData();
          } else {
            console.error("Failed to add new item:", response.statusText);
          }
        } catch (error) {
          console.error("Error adding new item:", error);
        }
      };
  return (
    <div className="parent-form-div">
    <div className="form-div-admin">
      <form className="add-sport-form" onSubmit={handleSubmit}>
        <button className="close-btn" onClick={toggleShowForm}>
          X
        </button>
        <select
          className="dropdown"
          name="sportName"
          value={newSport.sportName}
          onChange={handleInputChange}
          required
        >
          <option value="">
            Select a sport <div className="asteric">*</div>
          </option>
          {uniqueSports.map((sport, index) => (
            <option key={index} value={sport}>
              {sport}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="nameOfSportsEquipment"
          placeholder="Equipment Name*"
          value={newSport.nameOfSportsEquipment}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="quantityOfSportsEquipment"
          placeholder="Quantity*"
          value={newSport.quantityOfSportsEquipment}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="imageLink"
          placeholder="Image Link*"
          value={newSport.imageLink}
          onChange={handleInputChange}
        />
        <button className="admin-button" type="submit">
          Confirm
        </button>
      </form>
    </div>
  </div>
  )
}

export default AddItem