import React, { useEffect, useState } from "react";
// import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import Button from "../Home/Button";
import "./AdminPage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddItem from "./forms/addItem";
import AddSport from "./forms/addSport";

const AdminPage = () => {
  const axios = useAxios();
  const [requestData, setRequestData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [data, setData] = useState({});
  useEffect(() => {
    fetchData();
    getDetails();
  }, []);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://sports-ims.onrender.com/request-details",
        { withCredentials: true }
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
          let sMinutes = minutes.toString();
          if (sMinutes.length === 1) {
            sMinutes = "0" + sMinutes;
          }
          const hours = parseInt(newTime.slice(-5, -3));
          hour = (hour + hours + 5) % 24;
          let sHour = hour.toString();
          if (sHour.length === 1) {
            sHour = "0" + sHour;
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
  const handleStatusChange = async (email, item, id, newStatus) => {
    try {
      const response = await axios.patch(
        `https://sports-ims.onrender.com/update-status/${id}`,
        { withCredentials: true },
        { status: newStatus }
      );

      if (response.status === 200) {
        // fetchData();
        if (email)
          sendEmail({ status: newStatus, itemName: item, email: email });
        else console.log("error bro");
      } else {
        console.error("Failed to update status:", response.statusText);
      }
      // fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  async function sendEmail(prop) {
    try {
      const sEmail = localStorage.getItem("userEmail");
      const res = await axios.post(
        "https://sports-ims.onrender.com/send-email",
        {
          senderEmail: sEmail,
          recieverEmail: prop.email,
          itemName: prop.itemName,
          status: prop.status,
        },
        { withCredentials: true }
      );
      if (res.status === 201) {
        console.log("mail sent successfully");
      } else if (res.status === 500) {
        console.error("some error occured", res.data);
      }
    } catch (err) {
      console.error("Error sending mail", err);
    }
  }

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://sports-ims.onrender.com/logout",
        { withCredentials: true }
      );
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
      const response = await axios.get(
        "https://sports-ims.onrender.com/InventoryData",
        { withCredentials: true }
      );
      setData(response.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  }

  // console.log(requestData);
  const [showAddSportForm, setShowAddSportForm] = useState(false);

  const toggleSportForm = () => {
    setShowAddSportForm((prev) => !prev);
  };

  // console.log(sportData);
  async function toggleShowForm() {
    setShowForm(!showForm);
  }
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
      {showForm && <AddItem showForm={showForm} setShowForm={setShowForm} />}

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
                {item.itemQuantity !== 0 && (
                  <button
                    onClick={() =>
                      handleStatusChange(
                        item.userEmail,
                        item.itemName,
                        item._id,
                        "accepted"
                      )
                    }
                  >
                    Accept
                  </button>
                )}
                <button
                  onClick={() =>
                    handleStatusChange(
                      item.userEmail,
                      item.itemName,
                      item._id,
                      "rejected"
                    )
                  }
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
        <AddSport
          showAddSportForm={showAddSportForm}
          setShowAddSportForm={setShowAddSportForm}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default AdminPage;
