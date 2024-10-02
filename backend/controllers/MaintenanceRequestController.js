const MaintenanceRequestModel = require('../models/MaintenanceRequestModel');

// ----------------GET ALL MAINTENANCE REQUESTS API START-------------------------
// @Request  GET
// @Route    /api/maintenanceRequests/
// @access   Private

const getAllMaintenanceRequests = async (req, res) => {
    try {
        const maintenanceRequests = await MaintenanceRequestModel.find()
            .populate('room')
            .populate('reportedBy')
            .populate('resolvedBy');
        res.status(200).json(maintenanceRequests);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching maintenance requests' });
    }
};

// ----------------GET MAINTENANCE REQUEST BY ID API START-------------------------
// @Request  GET
// @Route    /api/maintenanceRequests/:id
// @access   Private

const getMaintenanceRequestById = async (req, res) => {
    const { id } = req.params;

    try {
        const maintenanceRequest = await MaintenanceRequestModel.findById(id)
            .populate('room')
            .populate('reportedBy')
            .populate('resolvedBy');
        if (!maintenanceRequest) {
            return res.status(404).json({ error: 'Maintenance request not found' });
        }
        res.status(200).json(maintenanceRequest);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching maintenance request' });
    }
};

// ----------------CREATE MAINTENANCE REQUEST API START-------------------------
// @Request  POST
// @Route    /api/maintenanceRequests/
// @access   Private

const createMaintenanceRequest = async (req, res) => {
    const { room, reportedBy, issue } = req.body;

    try {
        const newMaintenanceRequest = await MaintenanceRequestModel.create({
            room,
            reportedBy,
            issue
        });

        res.status(201).json(newMaintenanceRequest);
    } catch (err) {
        res.status(500).json({ error: 'Error creating maintenance request' });
    }
};

// ----------------UPDATE MAINTENANCE REQUEST API START-------------------------
// @Request  PUT
// @Route    /api/maintenanceRequests/:id
// @access   Private

const updateMaintenanceRequest = async (req, res) => {
    const { id } = req.params;
    const {
        room,
        reportedBy,
        issue,
        status,
        resolvedBy,
        resolutionDetails,
        resolvedDate
    } = req.body;

    try {
        const updatedMaintenanceRequest = await MaintenanceRequestModel.findByIdAndUpdate(
            id,
            {
                room,
                reportedBy,
                issue,
                status,
                resolvedBy,
                resolutionDetails,
                resolvedDate
            },
            { new: true }
        );

        if (!updatedMaintenanceRequest) {
            return res.status(404).json({ error: 'Maintenance request not found' });
        }

        res.status(200).json(updatedMaintenanceRequest);
    } catch (err) {
        res.status(500).json({ error: 'Error updating maintenance request' });
    }
};

// ----------------DELETE MAINTENANCE REQUEST API START-------------------------
// @Request  DELETE
// @Route    /api/maintenanceRequests/:id
// @access   Private

const deleteMaintenanceRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMaintenanceRequest = await MaintenanceRequestModel.findByIdAndDelete(id);

        if (!deletedMaintenanceRequest) {
            return res.status(404).json({ error: 'Maintenance request not found' });
        }

        res.status(200).json({ success: 'Maintenance request deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting maintenance request' });
    }
};

// ----------------EXPORTING CONTROLLERS-------------------------

module.exports = {
    getAllMaintenanceRequests,
    getMaintenanceRequestById,
    createMaintenanceRequest,
    updateMaintenanceRequest,
    deleteMaintenanceRequest
};
