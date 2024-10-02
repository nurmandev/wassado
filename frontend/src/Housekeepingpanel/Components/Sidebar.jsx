import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div>
            <div className="sidebar" id="sidebar">
                <div className="sidebar-inner slimscroll">
                    <div id="sidebar-menu" className="sidebar-menu">
                        <ul>
                            <li className="active"> <Link to="/Housekeepingdashboard"><i className="fas fa-tachometer-alt"></i>
                                <span>Dashboard</span></Link> </li>
                            <li className="list-divider"></li>

                            {/* <li className="submenu mt-3 ml-3" ><i className="fas fa-suitcase"></i> <b className='ml-1'> User </b></li>
                            <li className="submenu"><Link to="/AdminUser"> Admin </Link></li>
                            <li className="submenu"><Link to="/ManagerUser"> Manager </Link></li>
                            <li className="submenu"><Link to="/HousekeepingUser"> Housekeeping </Link></li>
                            <li className="submenu"><Link to="/GuestUser"> Guest </Link></li> */}

                        
                            <li className="submenu"> <Link to="/HRoom"><i className="fas fa-key"></i> <span> Rooms </span></Link>
                            </li>

                            {/* <li className="submenu"> <Link to="/Booking"><i className="fas fa-suitcase"></i> <span> Booking </span> </Link>
                            </li>

                            <li className="submenu"> <Link to="/Payment"><i className="fas fa-suitcase"></i> <span> Payments </span> </Link>
                            </li> */}

                            <li className="submenu"> <Link to="/HMaintainanceRequest"><i className="fas fa-suitcase"></i> <span> Maintainance Request
                            </span> </Link>
                            </li>

                            <li className="submenu"> <Link to="/HHousekeeping"><i className="fas fa-suitcase"></i> <span> Housekeeping </span>
                            </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar