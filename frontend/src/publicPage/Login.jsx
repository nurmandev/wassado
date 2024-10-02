import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 
import Cookies from 'js-cookie';

const Login = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [Success, setSuccess] = useState('');
    const [Error, setError] = useState('');
    const navigate = useNavigate(); 

    const HandleSubmit = async (e) => {
        e.preventDefault();

        try {
            const requestresponse = await axios.post('/api/login', {
                userEmail,
                userPassword,
            });

            setSuccess(requestresponse.data.success);
            const token = requestresponse.data.userToken;
            const decode = jwtDecode(token);
            const userRole = decode.userRole; 
            console.log(userRole);

        
            Cookies.set('userAuth_Token', token, { expires: 1 });

            if (userRole === 'admin') {
                navigate('/Dashboard');
            } else if (userRole === 'manager') {
                navigate('/Managerdashboard');
            } else if (userRole === 'housekeeping') {
                navigate('/Housekeepingdashboard');
            } else {
                navigate('/'); 
            }

            setError('');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed, please try again.');

            setTimeout(() => {
                setError('');
            }, 5000); 
        }
    };

    return (
        <div className="container">
            <div className="container">
                <h1 className="mt-5 text-center">Login</h1>
                {Success && (
                    <div className="alert alert-success mt-5" role="alert">
                        <p>{Success}</p>
                    </div>
                )}
                {Error && (
                    <div className="alert alert-danger mt-5" role="alert">
                        <p>{Error}</p>
                    </div>
                )}
            </div>
            <div className="container">
                <form onSubmit={HandleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            required
                            type="email"
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            required
                            type="password"
                            onChange={(e) => setUserPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
