import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';

const HMaintainanceRequest = () => {
    const [maintenanceRequests, setMaintenanceRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [requestToDelete, setRequestToDelete] = useState(null);

    useEffect(() => {
        const fetchMaintenanceRequests = async () => {
            try {
                const response = await axios.get('/api/maintenanceRequests');
                setMaintenanceRequests(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching maintenance request data');
                setLoading(false);
            }
        };

        fetchMaintenanceRequests();
    }, []);

    const handleDelete = async () => {
        try {
            if (requestToDelete) {
                await axios.delete(`/api/maintenanceRequests/${requestToDelete}`);
                setMaintenanceRequests(
                    maintenanceRequests.filter(request => request._id !== requestToDelete)
                );
                setRequestToDelete(null);
                window.$('#delete_request').modal('hide');
            }
        } catch (error) {
            console.error('There was an error deleting the maintenance request!', error);
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
                                    <h4 className="card-title float-left mt-2">All Maintenance Requests</h4>
                                    <Link to="/HAddMaintainanceRequest" className="btn btn-primary float-right veiwbutton">
                                        Add Maintenance Request
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card card-table">
                                <div className="card-body maintenance_card">
                                    <div className="table-responsive">
                                        <table className="datatable table table-stripped table-hover table-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Request ID</th>
                                                    <th>Room</th>
                                                    <th>Reported By</th>
                                                    <th>Issue</th>
                                                    <th>Status</th>
                                                    <th>Resolved By</th>
                                                    <th>Resolution Details</th>
                                                    <th>Resolved Date</th>
                                                    <th className="text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {maintenanceRequests.map((request) => (
                                                    <tr key={request._id}>
                                                        <td>{request._id}</td>
                                                        <td>{request.room ? request.room.roomNumber : 'N/A'}</td>
                                                        <td>{request.reportedBy ? request.reportedBy.userName : 'N/A'}</td>
                                                        <td>{request.issue}</td>
                                                        <td>{request.status}</td>
                                                        <td>{request.resolvedBy ? request.resolvedBy.userName : 'N/A'}</td>
                                                        <td>{request.resolutionDetails || 'N/A'}</td>
                                                        <td>
                                                            {request.resolvedDate
                                                                ? new Date(request.resolvedDate).toLocaleDateString()
                                                                : 'N/A'}
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
                                                                    <Link
                                                                        className="dropdown-item"
                                                                        to={`/HEditMaintainanceRequest/${request._id}`}
                                                                    >
                                                                        <i className="fas fa-pencil-alt m-r-5"></i> Edit
                                                                    </Link>
                                                                    <Link
                                                                        className="dropdown-item"
                                                                        to="#"
                                                                        data-toggle="modal"
                                                                        data-target="#delete_request"
                                                                        onClick={() => setRequestToDelete(request._id)}
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

                    <div id="delete_request" className="modal fade delete-modal" role="dialog">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body text-center">
                                    <img src="assets/img/sent.png" alt="" width="50" height="46" />
                                    <h3>Are you sure you want to delete this maintenance request?</h3>
                                    <div className="m-t-20">
                                        <Link to="#" className="btn btn-white" data-dismiss="modal">
                                            Close
                                        </Link>
                                        <button type="submit" onClick={handleDelete} className="btn btn-danger ml-3">
                                            Delete
                                        </button>
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

export default HMaintainanceRequest;
