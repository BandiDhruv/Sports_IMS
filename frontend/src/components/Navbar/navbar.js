import React from 'react';
import "./navbar.css";
import { Link ,useNavigate} from 'react-router-dom';
import Button from './button';
// import axios from 'axios';
import useAxios from '../../hooks/useAxios';
import { toast , ToastContainer } from 'react-toastify';
const Navbar = () => {
  const navigate = useNavigate();
  const axios=useAxios();
    const handleLogout = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_IP}/logout`, { withCredentials: true });
          window.localStorage.clear();
          if (response.status === 200) {
            toast.success("successfull logout");
            navigate('/');
          } else {
            console.error('Logout failed with status:', response.status);
          }
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
    return (
        <div className='navbar'>
            <div className="nav1">
            <Link to="/home" ><img className='navbar-logo' src={process.env.PUBLIC_URL + "/assets/main-logo.png"} alt='na'/></Link>
            </div>
            <div className="nav2">
                <Link to="/home" className="homebutton">
                    <Button text="Home"/>
                </Link>
                <Link to="/Developers" className="one" >
                    <Button text="Meet The Developers"/>
                </Link>
                <div onClick={handleLogout}>
                    <Button text="Logout" />
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default Navbar;

