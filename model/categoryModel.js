const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "category is required"],
      lowercase: true,
      enum: ["famous-attractions", "nature", "special-offers"],
    },
    continent: {
      type: String,
      required: [true, "continent is required"],
      lowercase: true,
      enum: ["africa", "europe", "asia", "north-and-south-america"],
    },
    places: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tour",
      },
    ],
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
