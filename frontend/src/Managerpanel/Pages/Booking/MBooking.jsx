import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';

const MBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [bookingToDelete, setBookingToDelete] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/api/booking');
                setBookings(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching booking data');
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleDelete = async () => {
        try {
            if (bookingToDelete) {
                await axios.delete(`/api/booking/${bookingToDelete}`);
                setBookings(bookings.filter(booking => booking._id !== bookingToDelete));
                setBookingToDelete(null);
                window.$('#delete_booking').modal('hide');
            }
        } catch (error) {
            console.error('There was an error deleting the booking!', error);
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
                                    <h4 className="card-title float-left mt-2">All Bookings</h4>
                                    <Link to="/AddBooking" className="btn btn-primary float-right veiwbutton">Add Booking</Link>
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
                                                    <th>Booking ID</th>
                                                    <th>User</th>
                                                    <th>Room</th>
                                                    <th>Check-In Date</th>
                                                    <th>Check-Out Date</th>
                                                    <th>Status</th>
                                                    <th>Total Amount</th>
                                                    <th>Payment Status</th>
                                                    <th className="text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookings.map((booking) => (
                                                    <tr key={booking._id}>
                                                        <td>{booking._id}</td>
                                                        <td>{booking.user ? booking.user.userName : 'N/A'}</td> 
                                                        <td>{booking.room ? booking.room.roomNumber : 'N/A'}</td> 
                                                        <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                                                        <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                                                        <td>{booking.status}</td>
                                                        <td>{booking.totalAmount}</td>
                                                        <td>{booking.paymentStatus}</td>
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
                                                                    <Link className="dropdown-item" to={`/editBooking/${booking._id}`}>
                                                                        <i className="fas fa-pencil-alt m-r-5"></i> Edit
                                                                    </Link>
                                                                    <Link className="dropdown-item" to="#" data-toggle="modal" data-target="#delete_booking"
                                                                        onClick={() => setBookingToDelete(booking._id)}>
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

                    <div id="delete_booking" className="modal fade delete-modal" role="dialog">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body text-center">
                                    <img src="assets/img/sent.png" alt="" width="50" height="46" />
                                    <h3 className="delete_className">Are you sure you want to delete this booking?</h3>
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

export default MBooking;
