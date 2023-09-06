const Enquiry = require("../model/enquiryModel");
const User = require("../model/userModel");
const { getCurrentDateTime } = require("../utilities/currentDate");
const { sendEmail } = require("../middlewares/sendEmail");
const {
  enquiryMail,
  enquiryConfirmation,
} = require("../utilities/enquiryResponse");

const createEnquiry = async (req, res) => {
  try {
    const { enquiry } = req.body;
    const userEnquiry = await Enquiry.create({
      enquiry,
      user: req.user._id,
      time: getCurrentDateTime(),
    });
    const subject = "Enquiry";

    const html = await enquiryConfirmation(req.user.firstName);
    const data = {
      email: req.user.email,
      subject,
      html,
    };
    sendEmail(data);
    res.status(200).json({
      userEnquiry,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().populate("user");
    res.status(200).json({ enquiries });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const enquiryResponse = async (req, res) => {
  try {
    const { response } = req.body;
    const responseUpdate = await Enquiry.findByIdAndUpdate(
      req.params.enquiryId,
      { responded: true, response },
      { new: true }
    );
    const enqUser = await User.findById(responseUpdate.user);
    const subject = "Enquiry";

    const html = await enquiryMail(enqUser.firstName, response);
    const data = {
      email: enqUser.email,
      subject,
      html,
    };
    sendEmail(data);
    res.status(200).json({
      message: "response sent",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createEnquiry, enquiryResponse, getEnquiries };
