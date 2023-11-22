import React from 'react';
import "./navbar.css";
import { Link ,useNavigate} from 'react-router-dom';
import Button from './button';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          const response = await axios.get('http://localhost:8000/logout', { withCredentials: true });
          if (response.status === 200) {
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

            <Link to="/home" ><img className='navbar-logo' src={process.env.PUBLIC_URL + "/assets/main-logo.png"}/></Link>
            </div>
            <div className="nav2">
                <Link to="/home" className="homebutton">
                    <Button text="home"/>
                </Link>
                <Link to="/Developers" className="one" >
                    <Button text="Meet the Developers"/>
                </Link>
                <div onClick={handleLogout}>
                    <Button text="logout" />
                </div>
            </div>
            <div className="nav3">
              <img className="lnmiit-image" src={process.env.PUBLIC_URL + "/assets/LNMIIT-LOGO.png"} />
            </div>
        </div>
    );
}

export default Navbar;
