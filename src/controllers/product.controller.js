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
  // TODO: Esta ruta solo es para administradores.
  // ✅Solo los administradores pueden crear un producto
  // ✅Se tiene que validar el token del usuario y el rol para eliminar un producto
  // ✅Se debe establecer el token en los headers
  // ✅Se deben enviar correctamente las propiedades requeridas en el body
  // ✅body : title, description, price, image, category, countInStock | REQUERIDOS
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
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al eliminar el producto",
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
