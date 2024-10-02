const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "occupied", "cleaning", "maintenance"],
      default: "available",
    },
    bedType: { type: String },
    size: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
