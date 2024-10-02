import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Ensure you have jwt-decode imported

const BookNow = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { roomId } = location.state; // Get roomId from location state

    const [userId, setUserId] = useState(null);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [totalAmount, setTotalAmount] = useState(0); // Total amount from room details
    const [paymentStatus, setPaymentStatus] = useState('unpaid'); // Default payment status

    useEffect(() => {
        const token = Cookies.get('userAuth_Token');
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken.userId);
            setUserId(decodedToken.userId); // Get user ID from the token

            // Fetch the room details to get the total amount
            const fetchRoomDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/room/${roomId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    // Assuming the response contains the room details including the price
                    const roomDetails = response.data;
                    setTotalAmount(roomDetails.price); // Adjust based on your room model structure
                } catch (error) {
                    console.error('Error fetching room details:', error);
                }
            };

            fetchRoomDetails();
        }
    }, [roomId]); // Add roomId as a dependency to fetch room details when it changes

    const handleBooking = async (e) => {
        e.preventDefault();
        const token = Cookies.get('userAuth_Token');

        try {
            const response = await axios.post('/api/booking', {
                user: userId, // Sending user ID from JWT
                room: roomId,
                checkInDate,
                checkOutDate,
                status: 'pending', 
                totalAmount,
                paymentStatus,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Booking successful:', response.data);
            navigate('/'); // Navigate to a success page or home after booking
        } catch (error) {
            console.error('Error creating booking:', error.response?.data || error);
        }
    };

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="container mt-5">
            <h1 className="text-center">Book Room</h1>
            <form onSubmit={handleBooking}>
                <div className="mb-3">
                    <label htmlFor="checkInDate" className="form-label">Check In Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="checkInDate"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        min={today} // Prevent past date selection
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="checkOutDate" className="form-label">Check Out Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="checkOutDate"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        min={checkInDate || today} // Prevent past date and ensure check-out is after check-in
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="totalAmount" className="form-label">Total Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        id="totalAmount"
                        value={totalAmount}
                        readOnly // Make it read-only since it comes from room details
                    />
                </div>
                <button type="submit" className="btn btn-primary">Confirm Booking</button>
            </form>
        </div>
    );
};

export default BookNow;
