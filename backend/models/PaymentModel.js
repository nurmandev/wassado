const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: {
      type: String,
      enum: ["credit card", "cash", "online"],
      required: true,
    },
    paymentStatus: { type: String, enum: ["paid", "pending"], default: "paid" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
