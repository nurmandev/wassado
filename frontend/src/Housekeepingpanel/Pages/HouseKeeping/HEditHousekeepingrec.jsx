import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';

const HEditHousekeepingrec = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [housekeepingData, setHousekeepingData] = useState({
    room: '',
    assignedTo: '',
    task: '',
    status: 'pending', // default to pending
    scheduledTime: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 // const [rooms, setRooms] = useState([]);
 // const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchHousekeeping = async () => {
      try {
        const housekeepingRes = await axios.get(`/api/housekeeping/${id}`);
        const housekeeping = housekeepingRes.data;
        setHousekeepingData(housekeeping);
      } catch (error) {
        setErrorMessage('Error fetching housekeeping data');
      }
    };

    // const fetchRoomsAndUsers = async () => {
    //   try {
    //     const roomsRes = await axios.get('/api/room');
    //     const usersRes = await axios.get('/api/useraccount');
        
    //     setRooms(roomsRes.data);
    //     setUsers(usersRes.data.filter(user => user.userRole === 'housekeeping')); // filter housekeeping users
    //   } catch (error) {
    //     setErrorMessage('Error fetching rooms and users');
    //   }
    // };

    fetchHousekeeping();
    //fetchRoomsAndUsers();
  }, [id]);

  const handleInputChange = (e) => {
    setHousekeepingData({ ...housekeepingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/housekeeping/${id}`, housekeepingData);
      setSuccessMessage('Housekeeping task updated successfully!');
      setTimeout(() => {
        navigate('/HHousekeeping');
      }, 2000);
    } catch (error) {
      setErrorMessage('Error updating housekeeping task');
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
                <h3 className="page-title mt-5">Edit Housekeeping Task</h3>
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
                  
                  {/* <div className="col-md-4">
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
                  </div> */}

                  {/* <div className="col-md-4">
                    <div className="form-group">
                      <label>Assigned To</label>
                      <select
                        name="assignedTo"
                        className="form-control"
                        onChange={handleInputChange}
                        value={housekeepingData.assignedTo}
                        required
                      >
                        <option value="">Select User</option>
                        {users.map(user => (
                          <option key={user._id} value={user._id}>
                            {user.userName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div> */}

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
                        <option value="in-progress">In-Progress</option>
                      </select>
                    </div>
                  </div>

                  

                </div>
                <button type="submit" className="btn btn-primary mt-3">Update Housekeeping Task</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HEditHousekeepingrec;
