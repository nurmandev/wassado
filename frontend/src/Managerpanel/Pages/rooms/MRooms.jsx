import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { Link } from 'react-router-dom';

const MRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [RoomToDelete, setRoomToDelete] = useState(null); 




  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/room');
        setRooms(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching room data');
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleDelete = async () => {
    try {
      if (RoomToDelete) {
        await axios.delete(`/api/room/${RoomToDelete}`);
        setRooms(rooms.filter(room => room._id !== RoomToDelete)); 
        setRoomToDelete(null); 

        window.$('#delete_asset').modal('hide');
      }
    } catch (error) {
      console.error('There was an error deleting the Admin!', error);
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
                  <h4 className="card-title float-left mt-2">All Rooms</h4>
                  <Link to="/MaddRoom" className="btn btn-primary float-right veiwbutton">Add Room</Link>
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
                        <th>Room ID</th>
                          <th>Room Number</th>
                          <th>Room Type</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Bed Type</th>
                          <th>Room Size</th>
                          <th>Image</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rooms.map((room) => (
                          <tr key={room._id}>
                            <td>{room._id}</td>
                            <td>{room.roomNumber}</td>
                            <td>{room.type}</td>
                            <td>{room.price}</td>
                            <td>{room.status}</td>
                            <td>{room.bedType}</td>
                            <td>{room.size}</td>
                            <td>
                              <img
                                src={`/uploads/${room.image}`}
                                alt={room.type}
                                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                              />
                            </td>
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
                                  <Link className="dropdown-item" to={`/MEditRoom/${room._id}`}>
                                    <i className="fas fa-pencil-alt m-r-5"></i> Edit
                                  </Link>
                                  <Link className="dropdown-item" to="#" data-toggle="modal" data-target="#delete_asset"
                                  onClick={() => setRoomToDelete(room._id)} >
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

          <div id="delete_asset" className="modal fade delete-modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <img src="assets/img/sent.png" alt="" width="50" height="46" />
                  <h3 className="delete_className">Are you sure want to delete this Asset?</h3>
                  <div className="m-t-20">
                    <Link to="#" className="btn btn-white" data-dismiss="modal">Close</Link>
                    <button type="submit" onClick={handleDelete}  className="btn btn-danger ml-3">Delete</button>
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

export default MRooms;
