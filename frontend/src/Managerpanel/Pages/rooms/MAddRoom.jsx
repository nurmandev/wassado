import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';

const MAddRoom = () => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    type: '',
    price: '',
    status: 'available',
    bedType: '',
    size: '',
  });

  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('roomNumber', formData.roomNumber);
    data.append('type', formData.type);
    data.append('price', formData.price);
    data.append('status', formData.status);
    data.append('bedType', formData.bedType);
    data.append('size', formData.size);
    data.append('image', file);

    try {
      const response = await axios.post('/api/Room', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAlert({ message: response.data.success, type: 'success' });
      setFormData({
        roomNumber: '',
        type: '',
        price: '',
        status: 'available',
        bedType: '',
        size: '',
      });
      setFile(null);

      setTimeout(() => setAlert({ message: '', type: '' }), 3000);

    } catch (error) {
      setAlert({
        message: error.response?.data?.error || 'Something went wrong!',
        type: 'danger',
      });

      setTimeout(() => setAlert({ message: '', type: '' }), 3000);
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
                <h3 className="page-title mt-5">Add Room</h3>
              </div>
            </div>
          </div>

          {alert.message && (
            <div className={`alert alert-${alert.type}`} role="alert">
              {alert.message}
            </div>
          )}

          <div className="row">
            <div className="col-lg-12">
              <form onSubmit={handleSubmit}>
                <div className="row formtype">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Room Number</label>
                      <input
                        className="form-control"
                        type="text"
                        name="roomNumber"
                        value={formData.roomNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Room Type</label>
                      <input
                        className="form-control"
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        className="form-control"
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        className="form-control"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="available">Available</option>
                        <option value="occupied">Occupied</option>
                        <option value="cleaning">Cleaning</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Bed Type</label>
                      <input
                        className="form-control"
                        type="text"
                        name="bedType"
                        value={formData.bedType}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Room Size</label>
                      <input
                        className="form-control"
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Room Image</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">Create Room</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MAddRoom;
