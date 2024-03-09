import React, { useState, useEffect } from "react";
import "./AnotherComponent.css";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import green from "../../assetss/greencolor.jpg";
import red from "../../assetss/redcolor.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AnotherComponent = () => {
  const [fetchData, setFetchData] = useState([]);
  const { title } = useParams();
  const [statusData, setStatusData] = useState([]);
  async function getDetails() {
    await axios
      .get("https://sports-ims.onrender.com/InventoryDetails",{withCredentials: true})
      .then((resp) => {
        setFetchData(resp.data);
      })
      .catch((err) => {
        console.error("error fetching data", err);
      });
  }
  async function getStatus() {
    const userEmail = localStorage.getItem("userEmail");
    await axios
      .get(`https://sports-ims.onrender.com/get-status/${userEmail}`,{withCredentials: true})
      .then((resp) => {
        setStatusData(resp.data.details);
      })
      .catch((err) => {
        console.error("error getting status", err);
      });
  }
  // console.log(statusData);
  async function handleReserve(equipment, sport) {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const currentTime = new Date();
      if (!userEmail) {
        console.error("User not found in localStorage");
        return;
      }

      await axios
        .post(
          "https://sports-ims.onrender.com/reserve",{withCredentials: true},
          {
            sportName: sport,
            userEmail: userEmail,
            itemID: equipment._id,
            time: currentTime,
            imageLink: equipment.imageLink,
            itemName: equipment.nameOfSportsEquipment,
            itemQuantity:equipment.quantityOfSportsEquipment,
          }
        )
        .then((res) => {
          if (res.data.message === "success") {
            toast.success("Requested successfully");
          }
        });
    } catch (error) {
      console.error("Error during reservation:", error);
      toast.error("Error during reservation");
    }
  }

  useEffect(() => {
    getDetails();
    getStatus();
  }, [getStatus]);

  // console.log(fetchData)
  const filteredData = Array.isArray(fetchData)
    ? fetchData.filter((item) => item.sportName === title)
    : [];

  return (
    <div className="hello">
      <div id="cards-navbar">
        <Navbar />
      </div>
      {filteredData.map((item) => (
        <div className="cards-main" key={item._id}>
          <h1 className="cards-heading">{item.sportName}</h1>
          <div className="cards-container">
            {item.Inventory.map((equipments) => (
              <div className="cards" key={equipments._id}>
                <div className="cards-image">
                  <img
                    className="sportsCards-image"
                    src={equipments.imageLink}
                    alt="not available"
                  />
                </div>
                <div className="cards-name">
                  {equipments.nameOfSportsEquipment}
                </div>
                <div className="cards-quantity">
                  Quantity : {equipments.quantityOfSportsEquipment}
                </div>
                {
                  <div className="cards-damaged">
                    {equipments.isDamaged ? (
                      <img className="damaged-img" src={red} alt="Red" />
                    ) : (
                      <img className="damaged-img" src={green} alt="Green" />
                    )}
                  </div>
                }
                <div className="cards-available">
                  {equipments.quantityOfSportsEquipment !== 0 ? (
                    <span className="available-text">Available</span>
                  ) : (
                    <span className="available-text">Not Available</span>
                  )}
                </div>
                <div>
                  {equipments.quantityOfSportsEquipment !== 0 &&
                    !statusData.some(
                      (item) => item.itemID === equipments._id
                    ) && (
                      <button
                        className="cards-btn"
                        onClick={() =>
                          handleReserve(equipments, item.sportName)
                        }
                      >
                        RESERVE
                      </button>
                    )}
                    
                  {statusData.map((item) => {
                    if (item.itemID === equipments._id) {
                      if (item.status === "pending") {
                        return (
                          <button
                            key={`pending-${item.itemID}`}
                            className="cards-btn pending-btn"
                          >
                            Pending
                          </button>
                        );
                      } else if (item.status === "accepted") {
                        return (
                          <button
                            key={`accepted-${item.itemID}`}
                            className="cards-btn accepted-btn"
                          >
                            Accepted
                          </button>
                        );
                      } else if (item.status === "rejected") {
                        return (
                          <button
                            key={`rejected-${item.itemID}`}
                            className="cards-btn rejected-btn"
                          >
                            Rejected
                          </button>
                        );
                      }
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default AnotherComponent;
