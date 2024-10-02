import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';

const Dashboard = () => {
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [activeBookingCount, setActiveBookingCount] = useState(0);
	const [availableRoomsCount, setAvailableRoomsCount] = useState(0);



  useEffect(() => {
    const fetchAvailableRoomsCount = async () => {
      try {
        const response = await axios.get('/api/room/available');
        setAvailableRoomsCount(response.data.totalAvailableRooms);
      } catch (error) {
        console.error('Error fetching available rooms count:', error);
      }
    };
    fetchAvailableRoomsCount();
  }, []);




    useEffect(() => {
        const fetchActiveBookingCount = async () => {
            try {
                const response = await axios.get('/api/booking/active-count');
                setActiveBookingCount(response.data.activeBookingCount);
            } catch (error) {
                console.error('Failed to fetch active booking count', error);
            }
        };

        fetchActiveBookingCount();
    }, []);




	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await axios.get('/api/booking');
				setBookings(response.data);
				setLoading(false);
			} catch (err) {
				console.log('Error fetching booking data')
				setError(err)
				setLoading(false);
			}
		};

		fetchBookings();
	}, []);


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
						<div className="row">
							<div className="col-sm-12 mt-5">
								<h3 className="page-title mt-3">Welcome To LuxuryStay Hospitality</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item active">Admin Dashboard</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-xl-3 col-sm-6 col-12">
							<div className="card board1 fill">
								<div className="card-body">
									<div className="dash-widget-header">
										<div>
											<h3 className="card_widget_header">{activeBookingCount}</h3>
											<h6 className="text-muted">Total Booking</h6>
										</div>
										<div className="ml-auto mt-md-3 mt-lg-0">
											<span className="opacity-7 text-muted">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="#009688"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="feather feather-user-plus"
												>
													<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
													<circle cx="8.5" cy="7" r="4"></circle>
													<line x1="20" y1="8" x2="20" y2="14"></line>
													<line x1="23" y1="11" x2="17" y2="11"></line>
												</svg>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-xl-3 col-sm-6 col-12">
							<div className="card board1 fill">
								<div className="card-body">
									<div className="dash-widget-header">
										<div>
											<h3 className="card_widget_header">{availableRoomsCount}</h3>
											<h6 className="text-muted">Total Available Rooms</h6>
										</div>
										<div className="ml-auto mt-md-3 mt-lg-0">
											<span className="opacity-7 text-muted">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="#009688"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="feather feather-dollar-sign"
												>
													<line x1="12" y1="1" x2="12" y2="23"></line>
													<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
												</svg>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-12">
							<div className="card card-table">
								<div className="card-body booking_card">
									<div className="page-header">
										<div className="row align-items-center">
											<div className="col">
												<div className="mt-5">
													<h4 className="card-title float-left mt-2">
														<b>All Bookings</b>
													</h4>

												</div>
											</div>
										</div>
									</div>
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
												</tr>
											</thead>
											<tbody>
												{bookings.map((booking) => (
													<tr key={booking._id}>
														<td>{booking._id}</td>
														<td>{booking.user ? booking.user.userName : 'N/A'}</td> {/* Adjust this based on your user data */}
														<td>{booking.room ? booking.room.roomNumber : 'N/A'}</td> {/* Adjust this based on your room data */}
														<td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
														<td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
														<td>{booking.status}</td>
														<td>{booking.totalAmount}</td>
														<td>{booking.paymentStatus}</td>
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
			</div>
		</div>
	);
}

export default Dashboard;
