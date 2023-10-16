const { request, response } = require('express');
const Category = require('../models/category');

const getCategories = async (req = request, res = response) => {
  const categories = await Category.find();
  res.json({
    categories,
  });
};

const createCategory = async (req = request, res = response) => {
  const { name, image } = req.body;

  const category = new Category({ name, image });

  await category.save();
  res.json({
    message: `${name} category created successfully`,
  });
};

module.exports = {
  getCategories,
  createCategory,
};
