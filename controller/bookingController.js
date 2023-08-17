const Booking = require("../model/bookingModel");

const createBooking = async (req, res) => {
  try {
    const {
      flightId,
      returnFlightId,
      numberOfTickets,
      namesOfTravelers,
      flightDate,
      returnDate,
      flightPrice,
      carRentalId,
      rentalDays,
      rentalDate,
      rentalPrice,
      hotelId,
      tourId,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      numberOfRooms,
      hotelPrice,
      totalPrice,
    } = req.body;

    console.log(checkOutDate);
    const { _id } = req.user;

    const booking = {
      user: _id,
      tourId: tourId,
      hotelBooking: {
        hotel: hotelId,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        numberOfGuests: numberOfGuests,
        numberOfRooms: numberOfRooms,
        hotelPrice: hotelPrice,
      },
      flightBooking: {
        flight: flightId,
        numberOfTickets: numberOfTickets,
        namesOfTravelers: namesOfTravelers,
        flightDate: flightDate,
        returnFlight: returnFlightId,
        returnDate: returnDate,
        flightPrice: flightPrice,
      },
      rentalBooking: {
        carRental: carRentalId,
        rentalDays: rentalDays,
        rentalDate: rentalDate,
        rentalPrice: rentalPrice,
      },
      totalPrice: totalPrice,
    };

    const newBooking = await Booking.create(booking);
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

const getBookingById = async (req, res) => {
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

const getUserBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id });
    res.status(200).json({
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createBooking, getBookingById, getUserBooking };
