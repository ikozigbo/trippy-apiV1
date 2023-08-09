const express = require("express");
const { userAuth, isAdmin } = require("../middlewares/authmiddleware");
const { createCategory } = require("../controller/categoryController");

const router = express.Router();

router.post("/category", userAuth, isAdmin, createCategory);

module.exports = router;
