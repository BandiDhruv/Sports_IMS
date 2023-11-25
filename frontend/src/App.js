import './App.css';
import Home from "./components/Home/home";
import Login from "./components/LoginPage/loginpage";
import Signup from "./components/SignUpPage/signuppage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Developers from "./components/Developers/developers";
import AnotherComponent from "./components/AnotherComponent/AnotherComponent";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Error from '../src/components/ErrorPage/Error'
// import { faTruckField } from '@fortawesome/free-solid-svg-icons';
import AdminPage from './components/AdminPage/AdminPage';
import ManageItems from './components/AdminPage/ManageItems';

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("auth")?true:false);
  
  async function authF() {
    try {
      const res = await axios.get("http://localhost:8000/api",{withCredentials:true});
      if (res.data.message === "exist") {
        localStorage.setItem("auth",true);
        // console.log(res.data.userData);
        localStorage.setItem("userID",res.data.userData._id)
        localStorage.setItem("userEmail",res.data.userData.email)
        localStorage.setItem("userRole",res.data.userData.role)
        localStorage.setItem("userName",res.data.userData.name)
        setAuth(true);
      }
    } catch (error) {
      console.error("error:", error, "you are not logged in");
      setAuth(false);
    } 
  }

  useEffect(() => {
    authF();
    
  },[]);
const role=localStorage.getItem("userRole");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setAuth={setAuth} />} />
          <Route path="/signup" element={<Signup />} />
          {auth && <Route path="/home" element={<Home />} />}
          {auth && <Route path="/Developers" element={<Developers />} />}
          {auth && <Route path="/Sports/:title" element={<AnotherComponent />} />}
          <Route path="*" element={<Error />} />
          {role==="admin" && <Route path="/admin" element={<AdminPage/>} />}
          {role==="admin" &&  <Route path="/manage-items" element={<ManageItems/>} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
