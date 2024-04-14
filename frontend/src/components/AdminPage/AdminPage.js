import React, { useEffect, useState } from "react";
// import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import Button  from "../Home/Button";
import "./AdminPage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AdminPage = () => {
  const axios=useAxios()
  const [requestData, setRequestData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newSport, setNewSport] = useState({
    sportName: "",
    nameOfSportsEquipment:"",
    quantityOfSportsEquipment:"",
    imageLink:"",
  });
  const [data, setData] = useState({});
  useEffect(() => {
    fetchData();
    getDetails();
  }, []);
  const navigate = useNavigate();

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
  // console.log(requestData);
  const handleStatusChange = async (email,item,id, newStatus) => {
    try {
      const response = await axios.patch(
        `https://sports-ims.onrender.com/update-status/${id}`,{withCredentials: true},
        { status: newStatus },

      );
      
      if (response.status === 200) {
        // fetchData();
        if(email)
          sendEmail({status:newStatus,itemName:item,email:email})
        else console.log("error bro");
      } else {
        console.error("Failed to update status:", response.statusText);
      }
      // fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  async function toggleShowForm() {
    setShowForm(!showForm);
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSport({
      ...newSport,
      [name]: value,
    });
  };
  async function sendEmail(prop){
    try{
      const sEmail=localStorage.getItem("userEmail");
      const res=await axios.post("https://sports-ims.onrender.com/send-email",{
      senderEmail:sEmail,
      recieverEmail:prop.email,
      itemName:prop.itemName,
      status:prop.status
    },{withCredentials: true})
    if(res.status===201){
      console.log("mail sent successfully");
    }
    else if(res.status===500){
      console.error("some error occured",res.data);
    }
    } catch(err){
    console.error("Error sending mail",err);
  }
}
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
        setShowForm(false);
        toast.success("Successfully added new sport!");
        fetchData();
      } else {
        console.error("Failed to add new item:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("https://sports-ims.onrender.com/logout",{withCredentials: true});
      window.localStorage.clear();
      if (response.status === 200) {
        toast.success("successfull logout");
        navigate("/");
      } else {
        console.error("Logout failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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

  // console.log(requestData);
  const [showAddSportForm,setShowAddSportForm]=useState(false);
  const toggleSportForm = () =>{
    setShowAddSportForm( (prev)=> !prev );
  }
  const [sportData, setSportData] = useState({
    sportName: "",
    inventory: [],
  });
  
  const handleSportInputChange = (e) => {
    setSportData({ ...sportData, [e.target.name]: e.target.value });
  };
  
  const handleEquipmentInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedInventory = [...sportData.inventory];
    updatedInventory[index] = { ...updatedInventory[index], [name]: value };
    setSportData(prevState => ({
      ...prevState,
      inventory: updatedInventory,
    }));
  };
  
  
  
  const handleAddEquipment = () => {
    setSportData({
      ...sportData,
      inventory: [...sportData.inventory, { nameOfSportsEquipment: "", quantityOfSportsEquipment: "", imageLink: "" }],
    });
  };
  
  const handleRemoveEquipment = (index) => {
    const updatedInventory = [...sportData.inventory];
    updatedInventory.splice(index, 1);
    setSportData({ ...sportData, inventory: updatedInventory });
  };
  
  const handleSportSubmit =async(e)=>{
    e.preventDefault();
    console.log(sportData)
    try{

      const res=await axios.post("https://sports-ims.onrender.com/add-sport",sportData,{withCredentials:true})
      if(res.status===201){
        setSportData({
          sportName:"",
          inventory:[],
        });
        setShowAddSportForm(false);
        fetchData();
        toast.success("Successfully added new sport!");
      }else{
        console.err("Failed to add new Sport",res.statusText);
      }
    }catch(E){
      console.error("Error adding new Sport",E);
    }
  }
  // console.log(sportData);
  return (
    <div className="admin-container">
      <div className="admin-navbar">
        <a href="/manage-items">
          <Button text="Manage Items" />
        </a>
        <div onClick={toggleShowForm}>
          <Button text="Add New Item " />
        </div>
        <div onClick={toggleSportForm}>
          <Button text="Add New Sport" />
        </div>
        <div onClick={handleLogout}>
          <Button text="Logout" />
        </div>
      </div>
      {showForm && (
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
      )}

      {!showForm && (
        <div className="admin-items">
          {requestData.map((item) => (
            <div className="admin-items-inner" key={item._id}>
              <div className="admin-items-inner1">
                <img className="admin-item-image" src={item.imageLink} alt="" />
              </div>
              <div className="admin-items-inner2">
                <h2>{item.itemName}</h2>
                <p>Email: {item.userEmail}</p>
                {<p>Time Requested: {item.time}</p>}
                <p>Available Now: {item.itemQuantity}</p>
              </div>
              <div className="admin-items-inner3">
                {(item.itemQuantity!==0) && <button
                  onClick={() => handleStatusChange(item.userEmail,item.itemName,item._id, "accepted")}
                >
                  Accept
                </button>}
                <button
                  onClick={() => handleStatusChange(item.userEmail,item.itemName,item._id, "rejected")}
                >
                  Reject
                </button>
                <div />
              </div>
            </div>
          ))}
        </div>
      )}
      {showAddSportForm && (
        <div className="parent-form-div">
  <div className="form-div-admin">
    <form className="add-sport-form" onSubmit={handleSportSubmit}>
      <button className="close-btn" onClick={toggleSportForm}>
        X
      </button>
      <input
        type="text"
        name="sportName"
        placeholder="Sport Name*"
        value={sportData.sportName}
        onChange={handleSportInputChange}
        required
      />
      {/* Display equipment inputs based on inventory */}
      {sportData.inventory.map((equipment, index) => (
        <div key={index}>
          <input
            type="text"
            name="nameOfSportsEquipment"
            placeholder="Equipment Name*"
            value={equipment.nameOfSportsEquipment}
            onChange={(e) => handleEquipmentInputChange(e, index)}
            required
          />
          <input
            type="number"
            name="quantityOfSportsEquipment"
            placeholder="Quantity*"
            value={equipment.quantityOfSportsEquipment}
            onChange={(e) => handleEquipmentInputChange(e, index)}
            required
          />
          <input
            type="text"
            name="imageLink"
            placeholder="Image Link*"
            value={equipment.imageLink}
            onChange={(e) => handleEquipmentInputChange(e, index)}
          />
          <button className="admin-button" onClick={() => handleRemoveEquipment(index)}>
            Remove
          </button>
        </div>
      ))}
      <button className="admin-button" type="button" onClick={handleAddEquipment}>
        Add Equipment
      </button>
      {sportData.inventory.length > 0 && 
        <button className="admin-button" type="submit">
          Confirm
        </button>
      }
    </form>
  </div>
</div>

)}

      <ToastContainer />
    </div>
  );
};

export default AdminPage;

