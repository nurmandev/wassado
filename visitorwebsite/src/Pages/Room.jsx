import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rooms from '../Components/Rooms'

const Room = () => {
  const [rooms, setRooms] = useState([]);

  // Fetch rooms from API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/room');  // Assuming the API is at /api/Room
        setRooms(response.data);

      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div>



      <Rooms />

    </div>
  );
};

export default Room;
