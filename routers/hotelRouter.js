const express = require("express");
const {
  createHotel,
  searchHotels,
  updateHotelById,
  deleteHotelById,
  findHotelById,
  hotelRating,
  deleteHotelRating,
} = require("../controller/hotelController");
const { userAuth, isAdmin } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/create-hotel", userAuth, isAdmin, createHotel);
router.get("/find-hotels", searchHotels);
router.get("/findone-hotel/:id", findHotelById);
router.put("/update-hotel/:id", userAuth, isAdmin, updateHotelById);
router.put("/rate-hotel/:hotelId", userAuth, hotelRating);
router.put("/deletehotel-rating/:hotelId", userAuth, deleteHotelRating);
router.delete("/delete-hotel/:id", userAuth, isAdmin, deleteHotelById);

module.exports = router;
