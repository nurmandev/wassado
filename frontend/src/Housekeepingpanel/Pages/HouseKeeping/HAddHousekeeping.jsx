import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { useNavigate } from 'react-router-dom';

const HAddHousekeeping = () => {
  const navigate = useNavigate();
  const [housekeepingData, setHousekeepingData] = useState({
    room: '',
    assignedTo: '',
    task: '',
    status: 'pending', // Default value for status
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchRoomsAndUsers = async () => {
      try {
        const roomsRes = await axios.get('/api/room');
        const usersRes = await axios.get('/api/useraccount');

        // Filter only available rooms (or all rooms based on your logic)
        setRooms(roomsRes.data);

        // Filter users for housekeeping staff only
        const housekeepingUsers = usersRes.data.filter(user => user.userRole === 'housekeeping');
        setUsers(housekeepingUsers);
      } catch (error) {
        setErrorMessage('Error fetching rooms and users');
      }
    };
    fetchRoomsAndUsers();
  }, []);

  const handleInputChange = (e) => {
    setHousekeepingData({ ...housekeepingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/housekeeping', housekeepingData);
      setSuccessMessage('Housekeeping task added successfully!');
      setTimeout(() => {
        navigate('/HHousekeeping');
      }, 2000);
    } catch (error) {
      setErrorMessage('Error adding housekeeping task');
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
                <h3 className="page-title mt-5">Add Housekeeping Task</h3>
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
                        value={housekeepingData.room}
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
                      <label>Assigned To</label>
                      <select
                        name="assignedTo"
                        className="form-control"
                        onChange={handleInputChange}
                        value={housekeepingData.assignedTo}
                        required
                      >
                        <option value="">Select Housekeeper</option>
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
                      <label>Task</label>
                      <input
                        type="text"
                        name="task"
                        className="form-control"
                        onChange={handleInputChange}
                        value={housekeepingData.task}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        name="status"
                        className="form-control"
                        onChange={handleInputChange}
                        value={housekeepingData.status}
                        required
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="in-progress">In Progress</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Add Housekeeping Task
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HAddHousekeeping;
