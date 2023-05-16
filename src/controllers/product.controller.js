const { request, response } = require("express");
const Product = require("../models/product");

const getProducts = async (req = request, res = response) => {
  const products = await Product.find();
  res.json({
    products,
  });
};

const createProduct = async (req = request, res = response) => {
  const { title, description, price, image, category, countInStock } = req.body;

  const product = new Product({
    title,
    description,
    price,
    image,
    category,
    countInStock,
  });

  await product.save();
  res.json({
    message: `${title} created on database`,
  });
};

const updateProduct = (req = request, res = response) => {
  res.json({
    message: "PUT from products controller",
  });
};

const deleteProduct = (req = request, res = response) => {
  res.json({
    message: "DELETE from products controller",
  });
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
