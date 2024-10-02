const BookingModel = require("../models/BookingModel");

// @Request  GET
// @Route    /api/booking/
// @access   private
const getBookingDetails = async (req, res) => {
  try {
    const bookings = await BookingModel.find().populate("user room");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

// @Request  GET
// @Route    /api/booking/active-count
// @access   private
const getActiveBookingCount = async (req, res) => {
  try {
    // Count bookings with status 'confirmed' or 'checkedIn'
    const activeBookingCount = await BookingModel.countDocuments({
      status: { $in: ["confirmed", "checkedIn"] },
    });
    res.status(200).json({ activeBookingCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to count active bookings" });
  }
};

// @Request  GET
// @Route    /api/booking/:id
// @access   private
const getBookingById = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await BookingModel.findById(id).populate("user room");

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (err) {
    console.error(`Error fetching booking by ID: ${err}`);
    res.status(500).json({ error: "Failed to fetch booking" });
  }
};

//-------------------CREATE BOOKING API START-------------------------------------
// @Request  POST
// @Route    /api/booking/
// @access   private
const createBooking = async (req, res) => {
  const {
    user,
    room,
    checkInDate,
    checkOutDate,
    status,
    totalAmount,
    paymentStatus,
  } = req.body;

  if (!user || !room || !checkInDate || !checkOutDate || !totalAmount) {
    return res
      .status(400)
      .json({ error: "All required fields must be filled" });
  }

  try {
    const newBooking = await BookingModel.create({
      user,
      room,
      checkInDate,
      checkOutDate,
      status,
      totalAmount,
      paymentStatus,
    });

    console.log(newBooking);
    return res
      .status(201)
      .json({ success: "Booking Created Successfully", newBooking });
  } catch (err) {
    console.log(`Error in Booking Creation: ${err}`);
    res.status(500).json({ error: "Failed to create booking" });
  }
};
//-------------------CREATE BOOKING API END-------------------------------------

//-------------------UPDATE BOOKING API START-------------------------------------

// @Request  PUT
// @Route    /api/booking/:id
// @access   private
const updateBooking = async (req, res) => {
  const id = req.params.id;
  const {
    // user,
    // room,
    checkInDate,
    checkOutDate,
    status,
    totalAmount,
    paymentStatus,
  } = req.body;

  try {
    const updatedBooking = await BookingModel.findByIdAndUpdate(
      id,
      {
        // user,
        // room,
        checkInDate,
        checkOutDate,
        status,
        totalAmount,
        paymentStatus,
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    console.log(updatedBooking);
    res
      .status(200)
      .json({ success: "Booking Updated Successfully", updatedBooking });
  } catch (err) {
    console.log(`Error in Booking Update: ${err}`);
    res.status(500).json({ error: "Failed to update booking" });
  }
};
//-------------------UPDATE BOOKING API END-------------------------------------

//-------------------DELETE BOOKING API START-------------------------------------
// @Request  DELETE
// @Route    /api/booking/:id
// @access   private
const deleteBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedBooking = await BookingModel.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ success: "Booking Deleted Successfully" });
  } catch (err) {
    console.log(`Error in Booking Deletion: ${err}`);
    res.status(500).json({ error: "Failed to delete booking" });
  }
};
//-------------------DELETE BOOKING API END-------------------------------------

module.exports = {
  getBookingDetails,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingById,
  getActiveBookingCount,
};
