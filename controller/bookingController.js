const Booking = require("../model/bookingModel");

const createBooking = async (req, res) => {
  try {
    const { flightId, carRentalId, hotelId } = req.body;
    const { _id } = req.user;
    const newBooking = await Booking.create({
      user: _id,
      hotel: hotelId,
      carRental: carRentalId,
    });
    res.status(200).json({
      success: true,
      newBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    res.status(200).json({
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createBooking, getBooking };
