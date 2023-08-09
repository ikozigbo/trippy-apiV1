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

module.exports = { createCategory };
