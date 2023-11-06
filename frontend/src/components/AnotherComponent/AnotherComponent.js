import React, { useState, useEffect } from 'react';
import "./AnotherComponent.css";
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import green from '../../assetss/greencolor.jpg'
import red from '../../assetss/redcolor.png'


const AnotherComponent = () => {
  const [fetchData, setFetchData] = useState([]);
  const { title } = useParams();
  
  useEffect(() => {
    fetch("http://localhost:8000/InventoryDetails")
      .then(response => response.json())
      .then(data => {
        setFetchData(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []); 

  const filteredData = fetchData.filter(item => item.sportName === title);
  console.log(filteredData);

  return (
    <div className='hello'>
    <div id="cards-navbar">
        <Navbar />
    </div>
    {filteredData.map((item) => (
        <div className='cards-main'>
        <h1 className='cards-heading' key={item._id}>{item.sportName}</h1>
        <div className='cards-container'>
        {item.Inventory.map((equipments) => (
            <div className="cards">
                <div className="cards-image">
                    {/* <img src={equipments.imageLink} alt="not available" crossOrigin="anonymous"/> */}
                    <img src={`http://localhost:8000/proxy?imageUrl=${equipments.imageLink}`} alt="not available" crossOrigin="anonymous" />

                </div>
                <div className="cards-name">
                    {equipments.nameOfSportsEquipment}
                </div>
                <div className="cards-quantity">
                    {equipments.quantityOfSportsEquipment}
                </div>
                <div className="cards-damaged">
                    {equipments.isDamaged? <img className='damaged-img' src={red} alt="Red" /> : <img className='damaged-img' src={green} alt="Green" />}
                </div>
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
