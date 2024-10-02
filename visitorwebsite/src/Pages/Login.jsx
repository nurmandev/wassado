import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; // Use named import now
import Cookies from 'js-cookie';

const Login = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // for navigation after login

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Call your login API
            const response = await axios.post("/api/login", {
                userEmail,
                userPassword,
            });
            
            // Extract token from response
            const token = response.data.userToken;
            const decodedToken = jwtDecode(token); // Using jwtDecode as a named import
            
            // Check if the userRole is 'guest'
            if (decodedToken.userRole !== 'guest') {
                setErrorMessage("Role Error");
                setSuccessMessage('');
                return; // Stop further execution if role is not 'guest'
            }

            // Store the token in cookies
            Cookies.set('userAuth_Token', token, { expires: 1 });

            // Handle successful login
            setSuccessMessage(response.data.success);
            setErrorMessage('');
            
            // Redirect to homepage after successful login
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (err) {
            // Handle error responses robustly
            const errorResponse = err.response?.data?.error || "Login failed";
            setErrorMessage(errorResponse);
            setSuccessMessage('');
        }
    };

    return (
        <div className="container">
            <div className="login-container">
                <h1 className='text-center mt-5'>Login</h1>

                {/* Display Success Message */}
                {successMessage && (
                    <div className="alert alert-success mt-5" role="alert">
                        <p>{successMessage}</p>
                    </div>
                )}

                {/* Display Error Message */}
                {errorMessage && (
                    <div className="alert alert-danger mt-5" role="alert">
                        <p>{errorMessage}</p>
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="userEmail" className="form-label">Email address</label>
                        <input 
                            type="email" 
                            required 
                            className="form-control" 
                            id="userEmail" 
                            onChange={(e) => setUserEmail(e.target.value)} 
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="userPassword" className="form-label">Password</label>
                        <input 
                            type="password" 
                            required 
                            className="form-control" 
                            id="userPassword" 
                            onChange={(e) => setUserPassword(e.target.value)} 
                        />
                    </div>

                    <div className="mb-3">
                        <span>Not registered? <Link to="/register">Register here</Link></span>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
