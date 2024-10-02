
const RoomModel = require("../models/RoomModel");
const upload = require('../middleware/upload');


// @Request  GET
// @Route    /api/Room/
// @access   private
const getRoomDetails = async (req, res) => {
    const roomDetail = await RoomModel.find();
    res.status(200).json(roomDetail)
}


// @Request  GET
// @Route    /api/rooms/available
// @access   private
const getAvailableRoomsCount = async (req, res) => {
    try {
        const availableRoomsCount = await RoomModel.countDocuments({ status: 'available' });
        res.status(200).json({ totalAvailableRooms: availableRoomsCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch available rooms count' });
    }
};



// @Request  GET BY ID
// @Route    /api/Room/
// @access   private
const getRoomById = async (req, res) => {
    
    try {
      const room = await RoomModel.findById(req.params.id);
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }
      res.status(200).json(room);
    } catch (error) {
      console.log(`Error fetching room: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  





// ----------------CREATE ROOM API START-------------------------
// @Request  POST
// @Route    /api/Room/
// @access   private

const createRoom = async (req, res) => {
    try {
     
        if (!req.file) {
            return res.status(400).json({ error: 'Room image is required' });
        }

        const {
            roomNumber,
            type,
            price,
            status,
            bedType,
            size,
        } = req.body;

        const checkRoomNumber = await RoomModel.findOne({ roomNumber });
        if (checkRoomNumber) {
            return res.status(400).json({ error: "Room Number already exists" });
        }

        const newRoom = await RoomModel.create({
            roomNumber,
            type,
            price,
            status,
            bedType,
            size,
            image: req.file.filename,  
        });

        return res.status(200).json({ success: "Room Created Successfully", room: newRoom });
    } catch (err) {
        console.log(`Error in Room Creation: ${err}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ----------------CREATE ROOM API END-------------------------

// ----------------UPDATE ROOM API sTART-------------------------
// @Request  PUT
// @Route    /api/Room/id
// @access   private

const updateRoom = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedData = {
            roomNumber: req.body.roomNumber,
            type: req.body.type,
            price: req.body.price,
            status: req.body.status,
            bedType: req.body.bedType,
            size: req.body.size,
        };

        if (req.file) {
            updatedData.image = req.file.filename;  
        }

        const updatedRoom = await RoomModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedRoom) {
            return res.status(404).json({ error: "Room not found" });
        }

        res.status(200).json({ success: "Room Updated Successfully", room: updatedRoom });
    } catch (error) {
        console.log(`Error updating room: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ----------------UPDATE ROOM API END-------------------------


// ----------------DELETE ROOM API START-------------------------
// @Request  DELETE
// @Route    /api/Room/id
// @access   private


const deleteRoom = async(req,res)=>{

    const id = req.params.id;

    const delroom = await RoomModel.findByIdAndDelete(id) 

    if(!delroom){
        res.status(400).json({error:"account not deleted"});
    }
    res.status(200).json({success:'account deleted successfully'})
}

// ----------------DELETE ROOM API END-------------------------











module.exports = {
    getRoomDetails,
    createRoom,
    updateRoom,
    deleteRoom,
    getRoomById,
    getAvailableRoomsCount
};