const express = require("express");
const { userAuth, isAdmin } = require("../middlewares/authmiddleware");
const {
  createFlight,
  findFlights,
  findOneFlight,
  deleteFlight,
} = require("../controller/flightController");

const router = express.Router();

router.post("/create-flight", userAuth, isAdmin, createFlight);
router.get("/find-flights", findFlights);
router.get("/flight/:flightId", findOneFlight);
router.delete("/delete-flight/:flightId", userAuth, isAdmin, deleteFlight);

module.exports = router;
