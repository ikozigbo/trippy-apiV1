const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tourBooking: {
      tourPrice: { type: Number },
      tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tour",
      },
    },
    hotelBooking: {
      hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
      },
      checkInDate: { type: String },
      checkOutDate: { type: String },
      numberOfGuests: { type: Number },
      numberOfRooms: { type: Number },
      hotelPrice: { type: Number },
    },
    flightBooking: {
      flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flight",
      },
      numberOfTickets: { type: Number },
      namesOfTravelers: { type: Array },
      flightDate: { type: String },
      returnDate: { type: String },
      returnFlight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flight",
      },
      flightPrice: { type: Number },
    },
    rentalBooking: {
      carRental: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car-Rental",
      },
      rentalDays: { type: Number },
      rentalDate: { type: String },
      rentalPrice: { type: Number },
    },
    totalPrice: { type: Number },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = bookingModel;
