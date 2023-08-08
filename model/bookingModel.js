const { required } = require("@hapi/joi");
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
    },
    carRental: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car-Rental",
    },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = bookingModel;
