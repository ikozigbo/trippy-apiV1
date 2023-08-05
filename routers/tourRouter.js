const express = require("express");
const {
  createTour,
  searchTours,
  updateTourById,
  deleteTourById,
  findTourById,
  tourRating,
  deleteTourRating,
} = require("../controller/tourController");
const { userAuth, isAdmin } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/create-tour", userAuth, isAdmin, createTour);
router.get("/find-tours", searchTours);
router.get("/findone-tour", findTourById);
router.put("/update-tour/:id", userAuth, isAdmin, updateTourById);
router.put("/rate-tour/:tourId", userAuth, tourRating);
router.put("/deletetour-rating/:tourId", userAuth, deleteTourRating);
router.delete("/delete-tour/:id", userAuth, isAdmin, deleteTourById);

module.exports = router;
