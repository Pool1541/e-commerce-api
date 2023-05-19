const { request, response } = require("express");
const Product = require("../models/product");

const getProducts = async (req = request, res = response) => {
  const { category, limit = 10, from = 0 } = req.query;

  const query = category && { category };

  const [count, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    count,
    products,
  });
};

const createProduct = async (req = request, res = response) => {
  // TODO: Esta ruta solo es para administradores de producto.
  // Se debe validar el rol del usuario, solo pueden acceder los usuarios con rol "ADMIN" y "SUPER_ADMIN"
  // La validación se hace a través del token
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
