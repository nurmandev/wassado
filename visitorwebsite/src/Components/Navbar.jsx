import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'; 

const Navbar = () => {
    const isLoggedIn = Cookies.get('userAuth_Token') !== undefined;

    return (
        <div>
            {/* <!-- Header Section Begin --> */}
            <header className="header-section">
                <div className="menu-item">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2">
                                <div className="logo">
                                    <Link to="/">
                                        <h5>LuxuryStay Hospitality</h5>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-10">
                                <div className="nav-menu">
                                    <nav className="mainmenu">
                                        <ul>
                                            <li className="active"><Link to="/">Home</Link></li>
                                            <li><Link to="/rooms">Rooms</Link></li>
                                            <li><Link to="/about">About Us</Link></li>
                                            <li><Link to="/contact">Contact</Link></li>
                                            <li><Link to="/register">Signup/Login</Link></li>
                                            {isLoggedIn && <li><Link to="/profile">Profile</Link></li>} 
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* <!-- Header End --> */}
        </div>
    );
};

export default Navbar;
