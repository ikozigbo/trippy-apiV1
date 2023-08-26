const express = require("express");
const {
  createBooking,
  getBookingById,
  getUserBooking,
  getAllBookings,
} = require("../controller/bookingController");
const { userAuth, isAdmin } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/new-booking", userAuth, createBooking);
router.get("/get-booking/:id", userAuth, getBookingById);
router.get("/user-booking", userAuth, getUserBooking);
router.get("/all-bookings", userAuth, isAdmin, getAllBookings);

module.exports = router;
