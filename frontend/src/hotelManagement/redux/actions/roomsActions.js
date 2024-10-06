// roomsActions.js
import toast from "react-hot-toast";
import api from "../../../backend";
// import { hotelsListReducer } from "../reducers/hotelsListReducer";

// Action Types
export const GET_ALL_ROOMS = "GET_ALL_ROOMS";
export const CREATE_ROOM = "CREATE_ROOM";
export const GET_ROOM_BY_ID = "GET_ROOM_BY_ID";
export const EDIT_ROOM = "EDIT_ROOM";
export const GET_ROOMS_COUNT = "GET_ROOMS_COUNT";


// Action Creators
export const getAllRooms = (hotelId, status) => async (dispatch) => {
  try {
    const response = await api.get(`/room?hotelId=${hotelId}&status=${status}`);
    dispatch({ type: GET_ALL_ROOMS, payload: response.data });
  } catch (error) {
    toast.error(error.response.data.message || "Error Creating of Room")
  }
};
export const getAllRoomsCount = (hotelId) => async (dispatch) => {
  try {
    // http://localhost:4000/api/room/room-status-counts?hotelId=66fe6c3217895adcbe9763c1
    const response = await api.get(`/room/room-status-counts?hotelId=${hotelId}`); // Update endpoint as needed
    console.log("API ROOMS Count", { response });
    dispatch({ type: GET_ROOMS_COUNT, payload: response.data });
  } catch (error) {
    toast.error(error.response.data.message || "Error Creating of Room")
  }
};

export const createRoom = (roomData) => async (dispatch) => {
  try {
    const response = await api.post("/room", roomData); // Update endpoint as needed
    console.log("CREATE RESPONSE",{response})
    dispatch({ type: CREATE_ROOM, payload: response.data });
    // return response
  } catch (error) {
    toast.error(error.response.data.message || "Error Creating of Room")
    // Handle error if needed
  }
};

export const getRoomById = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/rooms/${id}`); // Update endpoint as needed
    dispatch({ type: GET_ROOM_BY_ID, payload: response.data });
  } catch (error) {
    console.error("Error fetching room by ID:", error);
    // Handle error if needed
  }
};

export const editRoom = (id, roomData) => async (dispatch) => {
  try {
    const response = await api.post(`/rooms/${id}`, roomData); // Update endpoint as needed
    console.log("edit room response",{ response });
    dispatch({ type: EDIT_ROOM, payload: response.data });
  } catch (error) {
    console.error("Error editing room:", error);
    // Handle error if needed
  }
};
