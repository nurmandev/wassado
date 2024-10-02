import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';

const EditPayment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [paymentData, setPaymentData] = useState({
        booking: '',
        amount: '',
        paymentDate:'',
        paymentMethod: 'credit card',
        paymentStatus: 'unpaid',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
   // const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                const paymentRes = await axios.get(`/api/payments/${id}`);
                const payment = paymentRes.data;
                setPaymentData(payment);
            } catch (error) {
                setErrorMessage('Error fetching payment data');
            }
        };

        // const fetchBookings = async () => {
        //     try {
        //         const bookingsRes = await axios.get('/api/bookings');
        //         const unpaidBookings = bookingsRes.data.filter(booking => booking.paymentStatus === 'unpaid');
        //         setBookings(unpaidBookings);
        //     } catch (error) {
        //         setErrorMessage('Error fetching bookings');
        //     }
        // };

        fetchPayment();
       // fetchBookings();
    }, [id]);

    const handleInputChange = (e) => {
        setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/api/payments/${id}`, paymentData);
            setSuccessMessage('Payment updated successfully!');
            setTimeout(() => {
                navigate('/Payment');
            }, 2000);
        } catch (error) {
            setErrorMessage('Error updating payment');
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
                                <h3 className="page-title mt-5">Edit Payment</h3>
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
                                                <option value="unpaid">Unpaid</option>
                                                <option value="paid">Paid</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary mt-3">Update Payment</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPayment;
