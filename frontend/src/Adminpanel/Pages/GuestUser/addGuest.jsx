import React, { useState } from 'react';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import axios from 'axios';


const AddGuest = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userPassword: '',
    userRole: 'guest', 
    firstName: '',
    lastName: '',
    userEmail: '',
    phoneNumber: '',
    status: 'active'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null); 
  const [alertType, setAlertType] = useState(''); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/useraccount', formData);
      setAlertMessage('User added successfully!');
      setAlertType('success'); 

      setFormData({
        userName: '',
        userPassword: '',
        userRole: 'guest',
        firstName: '',
        lastName: '',
        userEmail: '',
        phoneNumber: '',
        status: 'active'
      });
    } catch (error) {
      setAlertMessage('Error adding user. Please try again.');
      setAlertType('danger'); 
    }

    setTimeout(() => {
      setAlertMessage(null);
    }, 5000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Header />
      <Sidebar />

      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title mt-5">Add User</h3>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
             
              {alertMessage && (
                <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
                  {alertMessage}
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setAlertMessage(null)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row formtype">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        className="form-control"
                        type="email"
                        name="userEmail"
                        value={formData.userEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        className="form-control"
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Username</label>
                      <input
                        className="form-control"
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Password</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          type={showPassword ? 'text' : 'password'}
                          name="userPassword"
                          value={formData.userPassword}
                          onChange={handleChange}
                          required
                        />
                        <div className="input-group-append">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? 'Hide' : 'Show'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Role</label>
                      <select
                        className="form-control"
                        name="userRole"
                        value={formData.userRole}
                        onChange={handleChange}
                        required
                      >
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="housekeeping">Housekeeping</option>
                        <option value="guest">Guest</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        className="form-control"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary buttonedit1">
                  Create User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGuest;
