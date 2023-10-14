const { request, response } = require('express');
const SubCategory = require('../models/subCategory');

const getSubCategories = async (req = request, res = response) => {
  const subCategory = await SubCategory.find();
  res.json({
    subCategory,
  });
};

const createSubCategory = async (req = request, res = response) => {
  const { name, category } = req.body;

  const subCategory = new SubCategory({ name, category });

  await subCategory.save();
  res.json({
    message: `${name} subcategory created successfully`,
  });
};

module.exports = {
  getSubCategories,
  createSubCategory,
};
