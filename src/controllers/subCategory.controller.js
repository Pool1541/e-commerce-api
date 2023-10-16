const { request, response } = require('express');
const SubCategory = require('../models/subCategory');

const getSubCategories = async (req = request, res = response) => {
  const subCategory = await SubCategory.find();
  res.json({
    subCategory,
  });
};

const createSubCategory = async (req = request, res = response) => {
  try {
    const { name, category } = req.body;

    const subCategory = new SubCategory({ name, category });

    await subCategory.save();
    res.json({
      message: `${name} subcategory created successfully`,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errors: ['Ocurrió un error'],
    });
  }
};

module.exports = {
  getSubCategories,
  createSubCategory,
};
