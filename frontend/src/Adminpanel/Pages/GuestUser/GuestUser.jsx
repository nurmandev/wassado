import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { Link } from 'react-router-dom';

const GuestUser = () => {
  const [guests, setGuests] = useState([]);
  const [guestToDelete, setGuestToDelete] = useState(null); 

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await axios.get('/api/useraccount');
      setGuests(response.data);
    } catch (error) {
      console.error('There was an error fetching the guests data!', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (guestToDelete) {
        await axios.delete(`/api/useraccount/${guestToDelete}`);
        setGuests(guests.filter(guest => guest._id !== guestToDelete)); 
        setGuestToDelete(null); 

        window.$('#delete_asset').modal('hide');
      }
    } catch (error) {
      console.error('There was an error deleting the guest!', error);
    }
  };

  const guestUsers = guests.filter(guest => guest.userRole === 'guest');

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
                  <h4 className="card-title float-left mt-2">Guest</h4>
                  <Link to="/addGuest" className="btn btn-primary float-right veiwbutton">Add Guest</Link>
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
                          <th>GuestID</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email ID</th>
                          <th>Ph.Number</th>
                          <th>User Name</th>
                          <th>Password</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {guestUsers.map(guest => (
                          <tr key={guest._id}>
                            <td>{guest._id}</td>
                            <td>{guest.firstName}</td>
                            <td>{guest.lastName}</td>
                            <td>{guest.userEmail}</td>
                            <td>{guest.phoneNumber || 'N/A'}</td>
                            <td>{guest.userName}</td>
                            <td>{guest.userPassword}</td>
                            <td>{guest.userRole}</td>
                            <td>{guest.status}</td>
                            <td className="text-right">
                              <div className="dropdown dropdown-action">
                                <Link to="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                  <i className="fas fa-ellipsis-v ellipse_color"></i>
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link className="dropdown-item" to={`/editGuest/${guest._id}`}>
                                    <i className="fas fa-pencil-alt m-r-5"></i> Edit
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                    data-toggle="modal"
                                    data-target="#delete_asset"
                                    onClick={() => setGuestToDelete(guest._id)} 
                                  >
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
        </div>

        <div id="delete_asset" className="modal fade delete-modal" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                <img src="assets/img/sent.png" alt="" width="50" height="46" />
                <h3 className="delete_class">Are you sure you want to delete this Guest?</h3>
                <div className="m-t-20">
                  <Link to="#" className="btn btn-white" data-dismiss="modal">Close</Link>
                  <button
                    type="submit"
                    className="btn btn-danger ml-3"
                    onClick={handleDelete} 
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GuestUser;
