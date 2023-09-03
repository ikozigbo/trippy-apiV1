const express = require("express");
const { userAuth, isAdmin } = require("../middlewares/authmiddleware");
const {
  createEnquiry,
  getEnquiries,
  enquiryResponse,
} = require("../controller/enquiryController");

const router = express.Router();

router.post("/create-enquiry", userAuth, createEnquiry);
router.get("/get-enquiries", userAuth, isAdmin, getEnquiries);
router.put("/respond-enquiry/:enquiryId", userAuth, isAdmin, enquiryResponse);

module.exports = router;
