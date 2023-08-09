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

module.exports = { createCategory, addTour, getAllCategories };
