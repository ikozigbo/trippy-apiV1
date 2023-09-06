const { sendEmail } = require("../middlewares/sendEmail");
const Booking = require("../model/bookingModel");
const QRCode = require("qrcode");
const { generateBookingEmail } = require("../utilities/bookingConfirmation");
const User = require("../model/userModel");
const Hotel = require("../model/hotelModel");
const Tour = require("../model/tourModel");
const Car = require("../model/carRentalModel");
const Flight = require("../model/flightModel");

// const qrCode = async (text) => {
//   try {
//     return await QRCode.toDataURL(text);
//   } catch (err) {
//     console.log("Error generating the QR code", err);
//   }
// };

const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
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
      tourPrice,
      totalPrice,
    } = req.body;

    const user = await User.findById(_id);

    const firstname = user.firstName;
    let hotelName = "no hotel booked";
    let hotelAddress = "-";
    let checkinDate = "-";
    let checkoutDate = "-";
    let numRooms = "-";
    let flightDepature = "-";
    let flightArrival = "-";
    let travelers = "-";
    let returnFlightDepature = "-";
    let returnFlightArrival = "-";
    let carRentalDetails = "-";
    let tourDetails = "-";
    const price = totalPrice;

    //console.log(checkOutDate);

    if (hotelId) {
      const hotel = await Hotel.findById(hotelId);
      hotelName = hotel.hotelName;
      hotelAddress = `${hotel.address}, ${hotel.city}, ${hotel.country}`;
      checkinDate = checkInDate;
      checkoutDate = checkOutDate;
      numRooms = numberOfRooms;
    }
    if (tourId) {
      const tour = await Tour.findById(tourId);
      tourDetails = `${tour.tourName}, ${tour.city}, ${tour.country}`;
    }
    if (flightId) {
      const flight = await Flight.findById(flightId);
      flightDepature = ` ${flight.from}, ${flight.depatureAirport}, ${flight.depatureTime}, ${flightDate}`;
      flightArrival = ` ${flight.to}, ${flight.arrivalAirport}, ${flight.arrivalTime}, ${flightDate}`;

      travelers = namesOfTravelers;
    }
    if (returnFlightId) {
      const returnFlight = await Flight.findById(returnFlightId);
      returnFlightDepature = ` ${returnFlight.from}, ${returnFlight.depatureAirport}, ${returnFlight.depatureTime}, ${returnDate}`;
      returnFlightArrival = ` ${returnFlight.to}, ${returnFlight.arrivalAirport}, ${returnFlight.arrivalTime}, ${returnDate}`;
    }
    if (carRentalId) {
      const carRental = await Car.findById(carRentalId);
      carRentalDetails = `${carRental.brand}, ${carRental.model}, ${carRental.color}, rental registration: ${carRental.registrationNumber}, rental date: ${rentalDate}, for: ${rentalDays} days`;
    }
    const booking = {
      user: _id,
      tourBooking: {
        tourPrice: tourPrice,
        tourId: tourId,
      },
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
    console.log(newBooking);
    const refNum = newBooking._id;
    // const code = await qrCode(`https://trippy-huas.onrender.com`);
    //console.log(code);
    const subject = "Booking Confirmation";
    const link = `https://trippy-huas.onrender.com`;
    const html = await generateBookingEmail(
      firstname,
      hotelName,
      hotelAddress,
      checkinDate,
      checkoutDate,
      numRooms,
      flightDepature,
      flightArrival,
      travelers,
      returnFlightDepature,
      returnFlightArrival,
      carRentalDetails,
      tourDetails,
      price,
      refNum
    );
    console.log(html);
    const data = {
      email: user.email,
      subject,
      html,
    };
    sendEmail(data);
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

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", ["firstName", "lastName", "profilePicture"])
      .populate("tourBooking.tourId", ["tourName"])
      .populate("hotelBooking.hotel");
    res.status(200).json({
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getBookingById,
  getUserBooking,
  getAllBookings,
};
