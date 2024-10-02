import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    // Fetch rooms from API
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/room');
                console.log(response.data);
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching room details:', error);
            }
        };
        fetchRooms();
    }, []);

    // Handle Book Now Click
    const handleBookNow = (roomId) => {
        const token = Cookies.get('userAuth_Token');
        
        if (token) {
            // User is logged in, navigate to booknow page with roomId
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId; // Adjust according to your token structure
            navigate('/booknow', { state: { roomId, userId } });
        } else {
            // User is not logged in, navigate to login page
            navigate('/login');
        }
    };

    return (
        <div>
            {/* Breadcrumb Section */}
            <div className="breadcrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text">
                                <h2>Our Rooms</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rooms Section */}
            <section className="rooms-section spad">
                <div className="container">
                    <div className="row">
                        {rooms.map((room) => (
                            <div className="col-lg-4 col-md-6" key={room._id}>
                                <div className="room-item">
                                    <img src={`/uploads/${room.image}`} alt={room.type} />
                                    <div className="ri-text">
                                        <h4>{room.type}</h4>
                                        <h3>{room.price}$<span>/Pernight</span></h3>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td className="r-o">Room No.:</td>
                                                    <td>{room.roomNumber}</td>
                                                </tr>
                                                <tr>
                                                    <td className="r-o">Status:</td>
                                                    <td>{room.status}</td>
                                                </tr>
                                                <tr>
                                                    <td className="r-o">Bed:</td>
                                                    <td>{room.bedType}</td>
                                                </tr>
                                                <tr>
                                                    <td className="r-o">Size:</td>
                                                    <td>{room.size}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {/* Use handleBookNow with the room ID */} 
                                        <button onClick={() => handleBookNow(room._id)} className="primary-btn">Book Now</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Rooms;
