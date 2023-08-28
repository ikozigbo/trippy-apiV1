const User = require("../model/userModel");
const Tour = require("../model/tourModel");
const Car = require("../model/carRentalModel");
const Booking = require("../model/bookingModel");
const Hotel = require("../model/hotelModel");
const Flight = require("../model/flightModel");

const signupAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      res.status(400).json({
        message: "email already registerd",
      });
    } else {
      const salt = bcryptjs.genSaltSync(10);
      const hash = bcryptjs.hashSync(password, salt);
      const user = await User.create({
        username,
        email: email.toLowerCase(),
        isAdmin: true,
        password: hash,
      });
      const token = await genToken(user._id, "30m");
      const subject = "New User";
      const link = `${req.protocol}://${req.get("host")}/api/verify/${token}`;
      const message = `welcome onboard kindly use this ${link} to verify your account`;
      const data = {
        email: email,
        subject,
        message,
      };
      //sendEmail(data);
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const blockUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const blockedUser = await User.findByIdAndUpdate(
      userId,
      { isBlocked: true },
      { new: true }
    );
    if (blockedUser) {
      res.status(200).json({ message: "user Blocked", blockedUser });
    } else {
      res.status(404).json({ message: "no such user" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const unblockUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const unblockedUser = await User.findByIdAndUpdate(
      userId,
      { isBlocked: false },
      { new: true }
    );
    if (unblockedUser) {
      res.status(200).json({ message: "user Unblocked", unblockedUser });
    } else {
      res.status(404).json({ message: "no such user" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllBlockedUsers = async (req, res) => {
  try {
    const blockedUsers = await User.find({ isBlocked: true });
    res.status(200).json({ blockedUsers });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const upgradeUserToAdmin = async (req, res) => {
  try {
    const { userId } = req.body;
    const newAdmin = await User.findByIdAndUpdate(
      userId,
      { isAdmin: true },
      { new: true }
    );
    if (newAdmin) {
      res.status(200).json({ message: "success", newAdmin });
    } else {
      res.status(404).json({ message: "no such user" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

function calculateTotalPrice(bookings) {
  // Use the reduce method to iterate through the array and add up the totalPrice values
  const totalPriceSum = bookings.reduce((accumulator, currentBooking) => {
    return accumulator + currentBooking.totalPrice;
  }, 0); // Initial value of the accumulator is 0

  return totalPriceSum;
}

const dashboardData = async (req, res) => {
  try {
    const users = await User.find();
    const tours = await Tour.find();
    const bookings = await Booking.find();
    const flights = await Flight.find();
    const hotels = await Hotel.find();
    const cars = await Car.find();
    const revenue = calculateTotalPrice(bookings);
    res.status(200).json({
      users: users.length,
      tours: tours.length,
      hotels: hotels.length,
      flights: flights.length,
      cars: cars.length,
      revenue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  upgradeUserToAdmin,
  blockUser,
  unblockUser,
  getAllBlockedUsers,
  signupAdmin,
  dashboardData,
};
