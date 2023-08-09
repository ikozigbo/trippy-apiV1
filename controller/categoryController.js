const Category = require("../model/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { category, continent } = req.body;
    const newCategory = await Category.create({
      category,
      continent,
    });
    res.status(200).json({
      newCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      categories,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addTour = async (req, res) => {
  try {
    const { tourId } = req.body;
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    category.places.push(tourId);
    await category.save();
    const updatedCategory = await Category.findById(categoryId).populate(
      "places"
    );
    res.status(200).json({
      updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const searchCategories = async (req, res) => {
  try {
    // Copy the original req.query object to avoid modifying it directly
    const queryObj = { ...req.query };

    // Define an array of allowed fields
    const allowedFields = ["category", "continent"];

    // Loop through the queryObj and delete any field that is not in the allowedFields array
    for (const key in queryObj) {
      if (!allowedFields.includes(key)) {
        delete queryObj[key];
      }
    }

    // Now query the database with the modified queryObj
    const category = await Category.find(queryObj).populate("places");

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCategory,
  addTour,
  getAllCategories,
  searchCategories,
};
