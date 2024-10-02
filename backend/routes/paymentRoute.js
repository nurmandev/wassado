const express = require("express");
const router = express.Router();

const {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/PaymentController");

router.route("/").get(getAllPayments).post(createPayment);
router
  .route("/:id")
  .get(getPaymentById)
  .put(updatePayment)
  .delete(deletePayment);

module.exports = router;
