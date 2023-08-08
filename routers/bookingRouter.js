const express = require("express");
const {
  createBooking,
  getBooking,
} = require("../controller/bookingController");
const { userAuth } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/new-booking", userAuth, createBooking);
router.get("/get-booking/:id", userAuth, getBooking);

module.exports = router;
