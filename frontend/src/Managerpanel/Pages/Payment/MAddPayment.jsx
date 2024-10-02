import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { useNavigate } from 'react-router-dom';

const MAddPayment = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    booking: '',
    amount: '',
    paymentMethod: 'credit card', // Default value for payment method
    paymentStatus: 'paid', // Default value for payment status
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsRes = await axios.get('/api/booking');
        
        // Filter bookings with paymentStatus 'unpaid'
        const unpaidBookings = bookingsRes.data.filter(booking => booking.paymentStatus === 'unpaid');
        
        setBookings(unpaidBookings);
      } catch (error) {
        setErrorMessage('Error fetching bookings');
      }
    };
    fetchBookings();
  }, []);

  const handleInputChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/payments', paymentData);
      setSuccessMessage('Payment added successfully!');
      setTimeout(() => {
        navigate('/MPayment');
      }, 2000);
    } catch (error) {
      setErrorMessage('Error adding payment');
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
                <h3 className="page-title mt-5">Add Payment</h3>
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
                      <label>Booking</label>
                      <select
                        name="booking"
                        className="form-control"
                        onChange={handleInputChange}
                        value={paymentData.booking}
                        required
                      >
                        <option value="">Select Booking</option>
                        {bookings.map(booking => (
                          <option key={booking._id} value={booking._id}>
                            {`ID: ${booking._id}-
                            Payment Status: ${booking.paymentStatus}-
                            Amount: ${booking.totalAmount}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Amount</label>
                      <input
                        type="number"
                        name="amount"
                        className="form-control"
                        onChange={handleInputChange}
                        value={paymentData.amount}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Payment Method</label>
                      <select
                        name="paymentMethod"
                        className="form-control"
                        onChange={handleInputChange}
                        value={paymentData.paymentMethod}
                        required
                      >
                        <option value="credit card">Credit Card</option>
                        <option value="cash">Cash</option>
                        <option value="online">Online</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Payment Status</label>
                      <select
                        name="paymentStatus"
                        className="form-control"
                        onChange={handleInputChange}
                        value={paymentData.paymentStatus}
                        required
                      >
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Add Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MAddPayment;
