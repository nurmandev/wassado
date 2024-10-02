import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [roomData, setRoomData] = useState({
    roomNumber: '',
    type: '',
    price: '',
    status: '',
    bedType: '',
    size: '',
    image: '',
  });
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`/api/room/${id}`);
        setRoomData(response.data);
      } catch (error) {
        setErrorMessage('Error fetching room data');
      }
    };

    fetchRoom();
  }, [id]);

  const handleInputChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('roomNumber', roomData.roomNumber);
    formData.append('type', roomData.type);
    formData.append('price', roomData.price);
    formData.append('status', roomData.status);
    formData.append('bedType', roomData.bedType);
    formData.append('size', roomData.size);
    if (file) {
      formData.append('image', file);
    }

    try {
      const response = await axios.put(`/api/room/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccessMessage(response.data.success);
      setTimeout(() => {
        navigate('/Room');
      }, 2000); 
    } catch (error) {
      setErrorMessage('Error updating room');
    }
  };

  return (
    <div className="container mt-5">
      <Header/>
      <Sidebar/>
      <h2>Edit Room</h2>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Room Number</label>
          <input
            type="text"
            name="roomNumber"
            className="form-control"
            value={roomData.roomNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Room Type</label>
          <input
            type="text"
            name="type"
            className="form-control"
            value={roomData.type}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            name="price"
            className="form-control"
            value={roomData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            className="form-control"
            value={roomData.status}
            onChange={handleInputChange}
            required
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="cleaning">Cleaning</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div className="form-group">
          <label>Bed Type</label>
          <input
            type="text"
            name="bedType"
            className="form-control"
            value={roomData.bedType}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Room Size</label>
          <input
            type="text"
            name="size"
            className="form-control"
            value={roomData.size}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input type="file" className="form-control" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Update Room</button>
      </form>
    </div>
  );
};

export default EditRoom;
