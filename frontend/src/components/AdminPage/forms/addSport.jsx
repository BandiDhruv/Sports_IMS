import React ,{useEffect, useState} from 'react'
import useAxios from '../../../hooks/useAxios';
import { toast } from 'react-toastify';

const AddSport = (props) => {
    const axios=useAxios();
    const [requestData, setRequestData] = useState([]);
    const [sportData, setSportData] = useState({
        sportName: "",
        description: "No Discription",
        sportImage:"https://i.postimg.cc/wMrwsG2R/loremipsum.webp",
        inventory: [],
      });
      const toggleSportForm = () =>{
        props.setShowAddSportForm( (prev)=> !prev );
      }    
      useEffect(()=>{
        fetchData();
      },[])
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
              description:"No discription",
              sportImage:"https://i.postimg.cc/wMrwsG2R/loremipsum.webp",
              inventory:[],
            });
            props.setShowAddSportForm(false);
            fetchData();
            toast.success("Successfully added new sport!");
          }else{
            console.err("Failed to add new Sport",res.statusText);
          }
        }catch(E){
          console.error("Error adding new Sport",E);
        }
      }
  return (
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
      <input
        type="text"
        name="description"
        placeholder="description"
        value={sportData.description}
        onChange={handleSportInputChange}
      />
      <input
        type="text"
        name="sportImage"
        placeholder="Sport Image"
        value={sportData.sportImage}
        onChange={handleSportInputChange}
      />
      {/* Display equipment inputs based on inventory */}
      {sportData.inventory.map((equipment, index) => (
        <div key={index} className='remove-form'>
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
  )
}

export default AddSport