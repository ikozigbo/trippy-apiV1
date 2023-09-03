const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    enquiry: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    responded: {
      type: Boolean,
      default: false,
    },
    response: {
      type: String,
    },
    time: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const enquiryModel = mongoose.model("Enquiry", enquirySchema);

module.exports = enquiryModel;
