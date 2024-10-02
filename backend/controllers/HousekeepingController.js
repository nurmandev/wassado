const HousekeepingModel = require("../models/HousekeepingModel");
const mongoose = require('mongoose');

// @Request  GET
// @Route    /api/housekeeping
// @access   private
const getHousekeepingDetails = async (req, res) => {
    try {
        const housekeepingDetails = await HousekeepingModel.find()
            .populate('room assignedTo');
        res.status(200).json(housekeepingDetails);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch housekeeping tasks" });
    }
};

// @Request  GET by ID
// @Route    /api/housekeeping/:id
// @access   private
const getHousekeepingById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid housekeeping ID" });
    }

    try {
        const housekeepingDetail = await HousekeepingModel.findById(id)
            .populate('room assignedTo');

        if (!housekeepingDetail) {
            return res.status(404).json({ error: "Housekeeping task not found" });
        }

        res.status(200).json(housekeepingDetail);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch housekeeping task" });
    }
};

// @Request  POST
// @Route    /api/housekeeping
// @access   private
const createHousekeeping = async (req, res) => {
    const { room, assignedTo, task, status } = req.body;

    if (!room || !assignedTo || !task) {
        return res.status(400).json({ error: 'Room, AssignedTo, and Task are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(room) || !mongoose.Types.ObjectId.isValid(assignedTo)) {
        return res.status(400).json({ error: 'Invalid room or assignedTo ID' });
    }

    try {
        const newHousekeeping = await HousekeepingModel.create({
            room,
            assignedTo,
            task,
            status,
        });
        res.status(201).json({ success: "Housekeeping task created successfully", data: newHousekeeping });
    } catch (error) {
        res.status(500).json({ error: "Failed to create housekeeping task" });
    }
};

// @Request  PUT
// @Route    /api/housekeeping/:id
// @access   private
const updateHousekeeping = async (req, res) => {
    const { id } = req.params;
    const {
        //room, 
        // assignedTo, 
        task, status } = req.body;

    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }

    // if (room && !mongoose.Types.ObjectId.isValid(room)) {
    //     return res.status(400).json({ error: 'Invalid room ID' });
    // }

    // if (assignedTo && !mongoose.Types.ObjectId.isValid(assignedTo)) {
    //     return res.status(400).json({ error: 'Invalid assignedTo ID' });
    // }

    try {
        const updatedHousekeeping = await HousekeepingModel.findByIdAndUpdate(
            id,
            {
                //  room,
                // assignedTo, 
                task, status
            },
            { new: true }
        );

        if (!updatedHousekeeping) {
            return res.status(404).json({ error: "Housekeeping task not found" });
        }

        res.status(200).json({ success: "Housekeeping task updated successfully", data: updatedHousekeeping });
    } catch (error) {
        res.status(500).json({ error: "Failed to update housekeeping task" });
    }
};

// @Request  DELETE
// @Route    /api/housekeeping/:id
// @access   private
const deleteHousekeeping = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid housekeeping ID" });
    }

    try {
        const deletedHousekeeping = await HousekeepingModel.findByIdAndDelete(id);

        if (!deletedHousekeeping) {
            return res.status(404).json({ error: "Housekeeping task not found" });
        }

        res.status(200).json({ success: "Housekeeping task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete housekeeping task" });
    }
};

module.exports = {
    getHousekeepingDetails,
    createHousekeeping,
    updateHousekeeping,
    deleteHousekeeping,
    getHousekeepingById,
};
