const { request, response } = require('express');
const Product = require('../models/product');

const getProducts = async (req = request, res = response) => {
  const { category, brand, maxPrice, limit = 20, from = 0 } = req.query;

  function buildQuery(category = '', brand = '', maxPrice = 0) {
    category = category && category.split(',');
    brand = brand && brand.split(',');
    maxPrice = Number(maxPrice);
    try {
      let query = {};
      if (category.length > 0) query.category = { $in: category };
      if (brand.length > 0) query.brand = { $in: brand };
      if (maxPrice > 0) query.price = { $lte: maxPrice };
      return query;
    } catch (error) {
      return null;
    }
  }

  try {
    const [count, products] = await Promise.all([
      Product.countDocuments(buildQuery(category, brand, maxPrice)),
      Product.find(buildQuery(category, brand, maxPrice)).skip(Number(from)).limit(Number(limit)),
    ]);

    res.json({
      count,
      products,
    });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getProductById = async (req = request, res = response) => {
  const { id } = req.params;

  // TODO: Validar que sea un id válido de moongose
  try {
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went Wrong' });
  }
};

const createProduct = async (req = request, res = response) => {
  // TODO: Esta ruta solo es para administradores.
  // ✅Solo los administradores pueden crear un producto
  // ✅Se tiene que validar el token del usuario y el rol para eliminar un producto
  // ✅Se debe establecer el token en los headers
  // ✅Se deben enviar correctamente las propiedades requeridas en el body
  // ✅body : title, description, price, image, category, countInStock | REQUERIDOS
  const { title, description, price, image, category, brand, countInStock } = req.body;

  const product = new Product({
    title,
    description,
    price,
    image,
    category,
    brand,
    countInStock,
  });

  await product.save();
  res.json({
    message: `${title} created on database`,
  });
};

const updateProduct = (req = request, res = response) => {
  res.json({
    message: 'PUT from products controller',
  });
};

const deleteProduct = async (req = request, res = response) => {
  // TODO : Esta ruta solo es para administradores
  // ✅Solo los administradores pueden borrar productos
  // ✅Se tiene que validar el token del usuario y el rol para eliminar un producto
  // ✅Se debe establecer el id del producto en los parámetros
  // ✅Se debe establecer el token en los headers

  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    res.json({
      message: 'Product deleted successfully',
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: ['Error deleting product'],
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};
