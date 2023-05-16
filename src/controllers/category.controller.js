const { request, response } = require("express");
const Category = require("../models/category");

const getCategories = async (req = request, res = response) => {
  const categories = await Category.find();
  res.json({
    categories,
  });
};

const createCategory = async (req = request, res = response) => {
  const { name } = req.body;

  const category = new Category({ name });

  await category.save();
  res.json({
    message: `${name} category created successfully`,
  });
};

module.exports = {
  getCategories,
  createCategory,
};
