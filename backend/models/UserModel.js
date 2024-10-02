const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userPassword: { type: String, required: true },
    userRole: {
      type: String,
      enum: ["admin", "manager", "housekeeping", "guest"],
      required: true,
      default: "guest",
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userEmail: { type: String, required: true },
    phoneNumber: { type: Number },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
