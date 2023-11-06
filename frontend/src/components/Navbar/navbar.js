import React, { useState } from 'react';
import "./navbar.css";
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes, faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
import Button from './button';

const Navbar = () => {
    // const navigate = useNavigate();
    const [click, setClick] = useState(false);

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
            </div>
            <div className="nav3">
              <img className="lnmiit-image" src={process.env.PUBLIC_URL + "/assets/LNMIIT-LOGO.png"} />
            </div>
        </div>
    );
}

export default Navbar;
