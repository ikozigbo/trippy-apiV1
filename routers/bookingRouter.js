const express = require("express");
const {
  createBooking,
  getBookingById,
  getUserBooking,
} = require("../controller/bookingController");
const { userAuth } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/new-booking", userAuth, createBooking);
router.get("/get-booking/:id", userAuth, getBookingById);
router.get("/user-booking", userAuth, getUserBooking);

module.exports = router;
