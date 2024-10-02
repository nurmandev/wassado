import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';

const MPayement = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [paymentToDelete, setPaymentToDelete] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('/api/payments');
                setPayments(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching payment data');
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const handleDelete = async () => {
        try {
            if (paymentToDelete) {
                await axios.delete(`/api/payments/${paymentToDelete}`);
                setPayments(payments.filter(payment => payment._id !== paymentToDelete));
                setPaymentToDelete(null);
                window.$('#delete_payment').modal('hide');
            }
        } catch (error) {
            console.error('There was an error deleting the payment!', error);
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
                                    <h4 className="card-title float-left mt-2">All Payments</h4>
                                    <Link to="/MAddPayment" className="btn btn-primary float-right veiwbutton">Add Payment</Link>
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
                                                    <th>Payment ID</th>
                                                    <th>Booking</th>
                                                    <th>Amount</th>
                                                    <th>Payment Date</th>
                                                    <th>Payment Method</th>
                                                    <th>Payment Status</th>
                                                    <th className="text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {payments.map((payment) => (
                                                    <tr key={payment._id}>
                                                        <td>{payment._id}</td>
                                                        <td>{payment.booking ? payment.booking._id : 'N/A'}</td> {/* Display booking ID */}
                                                        <td>{payment.amount}</td>
                                                        <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                                                        <td>{payment.paymentMethod}</td>
                                                        <td>{payment.paymentStatus}</td>
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
                                                                    <Link className="dropdown-item" to={`/MEditPayment/${payment._id}`}>
                                                                        <i className="fas fa-pencil-alt m-r-5"></i> Edit
                                                                    </Link>
                                                                    <Link className="dropdown-item" to="#" data-toggle="modal" data-target="#delete_payment"
                                                                        onClick={() => setPaymentToDelete(payment._id)}>
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

                    <div id="delete_payment" className="modal fade delete-modal" role="dialog">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body text-center">
                                    <img src="assets/img/sent.png" alt="" width="50" height="46" />
                                    <h3 className="delete_className">Are you sure you want to delete this payment?</h3>
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

export default MPayement;
