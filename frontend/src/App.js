import './App.css';
import Home from "./components/Home/home";
import Login from "./components/LoginPage/loginpage";
import Signup from "./components/SignUpPage/signuppage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Developers from "./components/Developers/developers";
import AnotherComponent from "./components/AnotherComponent/AnotherComponent";
import { useEffect, useState } from 'react';
import axios from 'axios';
// import useAxios from './hooks/useAxios';
import Error from '../src/components/ErrorPage/Error'
import AdminPage from './components/AdminPage/AdminPage';
import ManageItems from './components/AdminPage/ManageItems';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useCallback } from 'react';

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("auth")?true:false);
  // const axios=useAxios()
  const authF = useCallback(async () => {
    try {
      const res = await axios.get("https://sports-ims.onrender.com/api",{withCredentials: true});
      if (res.data.message === "exist") {
        setAuth(true);
      }
    } catch (error) {
      setAuth(false);
    } 
  }, []);

  useEffect(() => {
    authF();
    
  },[authF]);
const role=localStorage.getItem("userRole");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setAuth={setAuth} />} />
          <Route path="/signup" element={<Signup />} />
          {auth && <Route path="/home" element={<Home />} />}
          {auth && role==="admin" && <Route path="/admin" element={<AdminPage />} />}
          {auth && <Route path="/Developers" element={<Developers />} />}
          {auth && <Route path="/Sports/:title" element={<AnotherComponent />} />}
          <Route path="*" element={<Error />} />
          {auth && role==="admin" &&  <Route path="/manage-items" element={<ManageItems/>} />}
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;