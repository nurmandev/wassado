const express = require("express");
const router = express.Router();

const {
  getAllMaintenanceRequests,
  getMaintenanceRequestById,
  createMaintenanceRequest,
  updateMaintenanceRequest,
  deleteMaintenanceRequest,
} = require("../controllers/MaintenanceRequestController");

router.route("/").get(getAllMaintenanceRequests).post(createMaintenanceRequest);
router
  .route("/:id")
  .get(getMaintenanceRequestById)
  .put(updateMaintenanceRequest)
  .delete(deleteMaintenanceRequest);

module.exports = router;
