const mongoose = require("mongoose");

const maintenanceRequestSchema = new mongoose.Schema(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issue: { type: String, required: true },
    status: {
      type: String,
      enum: ["reported", "in-progress", "resolved"],
      default: "reported",
    },
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    resolutionDetails: { type: String },
    reportedDate: { type: Date, default: Date.now },
    resolvedDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MaintenanceRequest", maintenanceRequestSchema);
