import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Use named import

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    // Fetch user data when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get('userAuth_Token');
                if (!token) {
                    navigate('/login'); // Redirect to login if token is not present
                    return;
                }

                // Decode the token to get the user ID
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId; // Assuming the user ID is stored as userId in the token

                // Fetch user data using the user ID
                const response = await axios.get(`/api/useraccount/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserData(response.data); // Assuming response.data contains user details
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login'); // Redirect to login on error
            }
        };

        fetchUserData();
    }, [navigate]);

    // Handle logout
    const handleLogout = () => {
        Cookies.remove('userAuth_Token'); // Remove the token from cookies
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Profile</h1>
            
            {userData ? (
                <div className="profile-details">
                    <h3>User Details</h3>
                    <br/>
                    <ul className="list-group">
                        <li className="list-group-item">Username: {userData.userName}</li>
                        <li className="list-group-item">First Name: {userData.firstName}</li>
                        <li className="list-group-item">Last Name: {userData.lastName}</li>
                        <li className="list-group-item">Email: {userData.userEmail}</li>
                        <li className="list-group-item">Phone Number: {userData.phoneNumber}</li>
                        <li className="list-group-item">Status: {userData.status}</li>
                    </ul>
                    <button className="btn btn-danger mt-3" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
            <br/>
        </div>
    );
};

export default Profile;
