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

  async function getDetails() {
    await axios.get("http://localhost:8000/InventoryDetails", { withCredentials: true }).then((resp) => {
      setFetchData(resp.data)
    }).catch(err => {
      console.error("error fetching data", err);
    })
  }
  // async function getButtonn(){
  //   await axios.get("http://localhost:8000/reserve",{withCredentials:true}).then((res)=>{

  //   })
  // }
  async function handleReserve(equipment) {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const currentTime = new Date();
      // console.log(userID);
      // Check if user.id is present in localStorage
      if (!userEmail) {
        console.error('User not found in localStorage');
        return;
      }
  
      // const requestData = {
      //   itemID: itemID,
      //   userID: userID,
      //   time: currentTime,
      // };
      // const imageLink=fetchData._
      await axios.post("http://localhost:8000/reserve", {
        userEmail: userEmail,
        itemID: equipment._id,
        time: currentTime,
        imageLink: equipment.imageLink,
      }, { withCredentials: true }).then((res)=>{
        if(res.data.message === "success")
        {
          alert("requested");
        }
      })
    } catch (error) {
      console.error('Error during reservation:', error);
    }
  }
  

  useEffect(() => {
    getDetails();
  }, []);

  // console.log(fetchData)
  const filteredData = Array.isArray(fetchData) ? fetchData.filter(item => item.sportName === title) : [];

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
                  <img className="sportsCards-image" src={equipments.imageLink} alt="not available" />
                </div>
                <div className="cards-name">
                  {equipments.nameOfSportsEquipment}
                </div>
                <div className="cards-quantity">
                  Quantity : {equipments.quantityOfSportsEquipment}
                </div>
                {<div className="cards-damaged">
                  {equipments.isDamaged ? <img className='damaged-img' src={red} alt="Red" /> : <img className='damaged-img' src={green} alt="Green" />}
                </div>}
                <div className="cards-available">
                  {equipments.quantityOfSportsEquipment !== 0 ? (<span className='available-text'>Available</span>) : (<span className='available-text'>Not Available</span>)}
                </div>
                <div>
  {equipments.quantityOfSportsEquipment !== 0 && (
    <button className="cards-btn" onClick={() => handleReserve(equipments)}>RESERVE</button>
  )}
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

// import React, { useState, useEffect } from 'react';
// import "./AnotherComponent.css";
// import { useParams } from 'react-router-dom';
// import Navbar from '../Navbar/navbar';
// import green from '../../assetss/greencolor.jpg'
// import red from '../../assetss/redcolor.png'
// import axios from 'axios';

// const AnotherComponent = () => {
//   const [fetchData, setFetchData] = useState([]);
//   const [statusData, setStatusData] = useState({});
//   const { title } = useParams();

//   async function getDetails() {
//     // Fetch sports equipment data
//     await axios.get("http://localhost:8000/InventoryDetails", { withCredentials: true }).then((resp) => {
//       setFetchData(resp.data);
//     }).catch(err => {
//       console.error("error fetching data", err);
//     })
//   }

//   async function getStatus(userEmail, itemID) {
//     // Fetch status data from requestinfos collection based on userEmail and itemID
//     await axios.get(`http://localhost:8000/request-status?userEmail=${userEmail}&itemID=${itemID}`, { withCredentials: true })
//       .then((resp) => {
//         setStatusData(resp.data);
//       }).catch(err => {
//         console.error("error fetching status", err);
//       })
//   }

//   async function handleReserve(itemID) {
//     try {
//       const userEmail = localStorage.getItem("userEmail");
//       const currentTime = new Date();
      
//       if (!userEmail) {
//         console.error('User not found in localStorage');
//         return;
//       }
  
//       await axios.post("http://localhost:8000/reserve", {
//         userEmail: userEmail,
//         itemID: itemID,
//         time: currentTime,
//       }, { withCredentials: true }).then((res)=>{
//         if(res.data.message === "success") {
//           alert("requested");
//         }
//       })
//     } catch (error) {
//       console.error('Error during reservation:', error);
//     }
//   }

//   useEffect(() => {
//     getDetails();
//   }, []);

//   useEffect(() => {
//     fetchData.forEach(item => {
//       getStatus(localStorage.getItem("userEmail"), item._id);
//     });
//   }, [fetchData]);

//   const filteredData = Array.isArray(fetchData) ? fetchData.filter(item => item.sportName === title) : [];

//   return (
//     <div className='hello'>
//       <div id="cards-navbar">
//         <Navbar />
//       </div>
//       {filteredData.map((item) => (
//         <div className='cards-main' key={item._id}>
//           <h1 className='cards-heading'>{item.sportName}</h1>
//           <div className='cards-container'>
//             {item.Inventory.map((equipments) => (
//               <div className="cards" key={equipments._id}>
//                 <div className="cards-image">
//                   <img className="sportsCards-image" src={equipments.imageLink} alt="not available" />
//                 </div>
//                 <div className="cards-name">
//                   {equipments.nameOfSportsEquipment}
//                 </div>
//                 <div className="cards-quantity">
//                   Quantity : {equipments.quantityOfSportsEquipment}
//                 </div>
//                 {<div className="cards-damaged">
//                   {equipments.isDamaged ? <img className='damaged-img' src={red} alt="Red" /> : <img className='damaged-img' src={green} alt="Green" />}
//                 </div>}
//                 <div className="cards-available">
//                   {equipments.quantityOfSportsEquipment !== 0 ? (<span className='available-text'>Available</span>) : (<span className='available-text'>Not Available</span>)}
//                 </div>
//                 <div>
//                   {/* Conditional rendering based on status */}
//                   {statusData[item._id] && statusData[item._id].userEmail === localStorage.getItem("userEmail") && (
//                     <>
//                       {statusData[item._id].status === 'pending' && (
//                         <button className="cards-btn" onClick={() => handleReserve(equipments._id)}>RESERVE</button>
//                       )}
//                       {statusData[item._id].status === 'accepted' && (
//                         <button>Accepted</button>
//                       )}
//                       {statusData[item._id].status === 'rejected' && (
//                         <button>Rejected</button>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default AnotherComponent;
