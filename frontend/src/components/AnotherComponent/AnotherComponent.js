// import React, { useState, useEffect } from 'react';
// import "./AnotherComponent.css";
// import { useParams } from 'react-router-dom';
// import Navbar from '../Navbar/navbar';
// import green from '../../assetss/greencolor.jpg'
// import red from '../../assetss/redcolor.png'


// const AnotherComponent = () => {
//   const [fetchData, setFetchData] = useState([]);
//   const { title } = useParams();
  
//   useEffect(() => {
//     // const token = Cookies.get('jwt_token'); 
//     // const headers = {
//     //   'authorization': `Bearer ${token}`, 
//     // };
//     fetch("http://localhost:8000/InventoryDetails")
//       .then(response => response.json())
//       .then(data => {
//         setFetchData(data);
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//       });
//   }, []); 

//   const filteredData = fetchData.filter(item => item.sportName === title);
//   console.log(filteredData);
import React, { useState, useEffect } from 'react';
import "./AnotherComponent.css";
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import green from '../../assetss/greencolor.jpg'
import red from '../../assetss/redcolor.png'
import axios from 'axios';

const AnotherComponent = () => {
  const [fetchData, setFetchData] = useState([]);
  const { title } = useParams();
  async function getDetails(){
    await axios.get("http://localhost:8000/InventoryDetails",{withCredentials:true}).then((resp)=>{
      console.log(resp.data)
      setFetchData(resp.data)
    }).catch(err=>{
      console.error("error fetching data",err);
    })
    // .then(response => response.json())
    // .then(data => {
    //   // Check if 'data' is an array before setting the state
    //   if (Array.isArray(data)) {
    //     setFetchData(data);
    //   } else {
    //     console.error("API response is not an array:", data);
    //   }
    // })
    // .catch(error => {
    //   console.error("Error fetching data:", error);
    // });
  }
  useEffect( () => {
    getDetails();
  }, []);

  // Check if fetchData is an array before using filter
  const filteredData = Array.isArray(fetchData) ? fetchData.filter(item => item.sportName === title) : [];
  console.log(filteredData);

  return (
    <div className='hello'>
    <div id="cards-navbar">
        <Navbar />
    </div>
    {filteredData.map((item) => (
        <div className='cards-main' key={item._id}>
        <h1 className='cards-heading'>{item.sportName}</h1>
        <div className='cards-container'>
        {item.Inventory.map((equipments) => (
            <div className="cards" key={equipments._id}>
                <div className="cards-image">
                    <img className="sportsCards-image"src={equipments.imageLink} alt="not available"/>
                </div>
                <div className="cards-name">
                    {equipments.nameOfSportsEquipment}
                </div>
                <div className="cards-quantity">
                    Quantity : {equipments.quantityOfSportsEquipment}
                </div>
                {<div className="cards-damaged">
                    {equipments.isDamaged? <img className='damaged-img' src={red} alt="Red" /> : <img className='damaged-img' src={green} alt="Green" />}
                </div> }
                {/* <div className="cards-damaged">
                  {equipments.isDamaged ? (
                    <div className="additional-info">
                      <img className='damaged-img' src={red} alt="Red" />
                      Damaged
                    </div>
                  ) : (
                    <div className="additional-info">
                      <img className='damaged-img' src={green} alt="Green" />
                      Not Damaged
                    </div>
                  )}
                </div> */}

                <div className="cards-available">
                    {equipments.quantityOfSportsEquipment !== 0 ? (<span className='available-text'>Available</span>) : (<span            className='available-text'>Not Available</span>)}
                </div>   
            </div>
            ))}
            </div>
        </div>
    ))}

    </div>
  );
}

export default AnotherComponent;
