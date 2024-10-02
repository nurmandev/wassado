const express = require("express");
const router = express.Router();

const {
  getHousekeepingDetails,
  getHousekeepingById,
  createHousekeeping,
  updateHousekeeping,
  deleteHousekeeping,
} = require("../controllers/HousekeepingController");

router.route("/").get(getHousekeepingDetails).post(createHousekeeping);
router
  .route("/:id")
  .get(getHousekeepingById)
  .put(updateHousekeeping)
  .delete(deleteHousekeeping);

module.exports = router;
