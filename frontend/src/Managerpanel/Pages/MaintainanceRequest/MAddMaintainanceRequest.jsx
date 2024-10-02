import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { useNavigate } from 'react-router-dom';

const MAddMaintainanceRequest = () => {
  const navigate = useNavigate();
  const [maintenanceData, setMaintenanceData] = useState({
    room: '',
    reportedBy: '',
    issue: '',
    status: 'pending', // Default value for status
    resolvedBy: '',
    resolutionDetails: '',
    resolvedDate: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
 // const [housekeepingUsers, setHousekeepingUsers] = useState([]);

  useEffect(() => {
    const fetchRoomsAndUsers = async () => {
      try {
        // Fetch rooms and users data from respective APIs
        const [roomsRes, usersRes] = await Promise.all([
          axios.get('/api/room'),
          axios.get('/api/useraccount'),
        ]);

        // No filtering for rooms, fetch all rooms
        setRooms(roomsRes.data);

        // Filtering users based on role
        const reportedByUsers = usersRes.data.filter(user => user.userRole !== 'guest');
        //const resolvedByUsers = usersRes.data.filter(user => user.userRole === 'housekeeping');

        setUsers(reportedByUsers);
       // setHousekeepingUsers(resolvedByUsers);
      } catch (error) {
        setErrorMessage('Error fetching rooms and users');
      }
    };
    fetchRoomsAndUsers();
  }, []);

  const handleInputChange = (e) => {
    setMaintenanceData({ ...maintenanceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to create a maintenance request
      await axios.post('/api/maintenanceRequests', {
        room: maintenanceData.room,
        reportedBy: maintenanceData.reportedBy,
        issue: maintenanceData.issue,
      });

      setSuccessMessage('Maintenance request added successfully!');
      setTimeout(() => {
        navigate('/MMaintainanceRequest');
      }, 2000);
    } catch (error) {
      setErrorMessage('Error adding maintenance request');
    }
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
                <h3 className="page-title mt-5">Add Maintenance Request</h3>
              </div>
            </div>
          </div>

          {successMessage && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              {successMessage}
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setSuccessMessage('')}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}

          {errorMessage && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {errorMessage}
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setErrorMessage('')}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}

          <div className="row">
            <div className="col-lg-12">
              <form onSubmit={handleSubmit}>
                <div className="row formtype">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Room</label>
                      <select
                        name="room"
                        className="form-control"
                        onChange={handleInputChange}
                        value={maintenanceData.room}
                        required
                      >
                        <option value="">Select Room</option>
                        {rooms.map(room => (
                          <option key={room._id} value={room._id}>
                            {room.roomNumber}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Reported By</label>
                      <select
                        name="reportedBy"
                        className="form-control"
                        onChange={handleInputChange}
                        value={maintenanceData.reportedBy}
                        required
                      >
                        <option value="">Select User</option>
                        {users.map(user => (
                          <option key={user._id} value={user._id}>
                            {user.userName} - {user.userRole}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Issue</label>
                      <input
                        type="text"
                        name="issue"
                        className="form-control"
                        onChange={handleInputChange}
                        value={maintenanceData.issue}
                        required
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Add Maintenance Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MAddMaintainanceRequest;
