import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';

const Housekeeping = () => {
  const [housekeepingRecords, setHousekeepingRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [housekeepingToDelete, setHousekeepingToDelete] = useState(null);

  useEffect(() => {
    const fetchHousekeepingRecords = async () => {
      try {
        const response = await axios.get('/api/housekeeping');
        setHousekeepingRecords(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching housekeeping records');
        setLoading(false);
      }
    };

    fetchHousekeepingRecords();
  }, []);

  const handleDelete = async () => {
    try {
      if (housekeepingToDelete) {
        await axios.delete(`/api/housekeeping/${housekeepingToDelete}`);
        setHousekeepingRecords(housekeepingRecords.filter(record => record._id !== housekeepingToDelete));
        setHousekeepingToDelete(null);
        window.$('#delete_housekeeping').modal('hide');
      }
    } catch (error) {
      console.error('There was an error deleting the housekeeping record!', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Header />
      <Sidebar />

      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <div className="mt-5">
                  <h4 className="card-title float-left mt-2">All Housekeeping Tasks</h4>
                  <Link to="/AddHousekeeping" className="btn btn-primary float-right veiwbutton">Add Task</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body booking_card">
                  <div className="table-responsive">
                    <table className="datatable table table-stripped table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th>Task ID</th>
                          <th>Room</th>
                          <th>Assigned To</th>
                          <th>Task</th>
                          <th>Status</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {housekeepingRecords.map((task) => (
                          <tr key={task._id}>
                            <td>{task._id}</td>
                            <td>{task.room ? task.room.roomNumber : 'N/A'}</td>
                            <td>{task.assignedTo ? task.assignedTo.userName : 'N/A'}</td>
                            <td>{task.task}</td>
                            <td>{task.status}</td>
                            <td className="text-right">
                              <div className="dropdown dropdown-action">
                                <Link
                                  to="#"
                                  className="action-icon dropdown-toggle"
                                  data-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis-v ellipse_color"></i>
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link className="dropdown-item" to={`/EditHousekeepingrec/${task._id}`}>
                                    <i className="fas fa-pencil-alt m-r-5"></i> Edit
                                  </Link>
                                  <Link className="dropdown-item" to="#" data-toggle="modal" data-target="#delete_housekeeping"
                                    onClick={() => setHousekeepingToDelete(task._id)}>
                                    <i className="fas fa-trash-alt m-r-5"></i> Delete
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="delete_housekeeping" className="modal fade delete-modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <img src="assets/img/sent.png" alt="" width="50" height="46" />
                  <h3 className="delete_className">Are you sure you want to delete this task?</h3>
                  <div className="m-t-20">
                    <Link to="#" className="btn btn-white" data-dismiss="modal">Close</Link>
                    <button type="submit" onClick={handleDelete} className="btn btn-danger ml-3">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Housekeeping;
