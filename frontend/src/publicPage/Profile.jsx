import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Use named import
import Header from '../Adminpanel/Components/Header';
import Sidebar from '../Adminpanel/Components/Sidebar';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get('userAuth_Token');
                if (!token) {
                    navigate('/login'); 
                    return;
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId; 
                const response = await axios.get(`/api/useraccount/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserData(response.data); 
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login'); 
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        Cookies.remove('userAuth_Token'); 
        navigate('/login'); 
    };

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="container mt-5">

                {userData ? (
                    <div className="profile-details">
                        <h3>User Details</h3>
                        <br />
                        <ul className="list-group">
                            <li className="list-group-item">Username: {userData.userName}</li>
                            <li className="list-group-item">First Name: {userData.firstName}</li>
                            <li className="list-group-item">Last Name: {userData.lastName}</li>
                            <li className="list-group-item">Email: {userData.userEmail}</li>
                            <li className="list-group-item">Phone Number: {userData.phoneNumber}</li>
                            <li className="list-group-item">Status: {userData.status}</li>
                            <li className="list-group-item">Role: {userData.userRole}</li>

                        </ul>
                        <button className="btn btn-danger mt-3" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
                <br />
            </div>


        </div>

    );
};

export default Profile;
