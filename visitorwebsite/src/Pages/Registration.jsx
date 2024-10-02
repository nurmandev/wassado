import React, { useState } from 'react';
import axios from 'axios';
// Import custom styles

const Registration = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userPassword: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    userEmail: '',
    phoneNumber: '',
    status: 'active',
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.userPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/useraccount/', {
        ...formData,
        userRole: 'guest',
      });

      if (response.status === 200) {
        setSuccessMessage('Registration successful!');
        setFormData({
          userName: '',
          userPassword: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          userEmail: '',
          phoneNumber: '',
          status: 'active',
        });
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <section className="contact-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="contact-text">
                <h2>Register Account</h2>
                <p>Welcome to the Sona Hotel Management System, your solution for seamless hotel management.</p>
              </div>
            </div>
            <div className="col-lg-7 offset-lg-1">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <input
                      type="text"
                      placeholder="User Name"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-lg-12">
                    <input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-lg-12">
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-lg-12">
                    <input
                      type="email"
                      placeholder="Email"
                      name="userEmail"
                      value={formData.userEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-lg-12 position-relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      name="userPassword"
                      value={formData.userPassword}
                      onChange={handleChange}
                      required
                    />
                    <i
                      className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} toggle-icon`}
                      onClick={togglePasswordVisibility}
                    ></i>
                  </div>

                  <div className="col-lg-12 position-relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <i
                      className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} toggle-icon`}
                      onClick={togglePasswordVisibility}
                    ></i>
                  </div>

                  <div className="col-lg-12">
                    <input
                      type="text"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-12">
                    <button type="submit" className="submit-btn">Register Now</button> <span>Already Registerd? <a href="/login">Login</a></span>
                  </div>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registration;
