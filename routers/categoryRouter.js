const express = require("express");
const { userAuth, isAdmin } = require("../middlewares/authmiddleware");
const {
  createCategory,
  addTour,
  getAllCategories,
  searchCategories,
} = require("../controller/categoryController");

const router = express.Router();

router.post("/category", userAuth, isAdmin, createCategory);
router.get("/all-categories", getAllCategories);
router.get("/find-categories", searchCategories);
router.put("/add-tour/:categoryId", userAuth, isAdmin, addTour);

module.exports = router;
