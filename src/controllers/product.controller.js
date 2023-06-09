const { request, response } = require("express");
const Product = require("../models/product");

const getProducts = async (req = request, res = response) => {
  const { category, brand, maxPrice, limit = 20, from = 0 } = req.query;
  // TODO: Los querys llegan en string, category=[] es un string: '[]'
  function buildQuery(category = [], brand = [], maxPrice = 0) {
    let query = {};
    if (category.length > 0) query.category = { $in: JSON.parse(category) };
    if (brand.length > 0) query.brand = { $in: JSON.parse(brand) };
    if (maxPrice > 0) query.price = { $lte: Number(maxPrice) };
    return query;
  }

  const [count, products, categories, brands] = await Promise.all([
    Product.countDocuments(buildQuery(category, brand, maxPrice)),
    Product.find(buildQuery(category, brand, maxPrice))
      .skip(Number(from))
      .limit(Number(limit)),
    Product.distinct("category"),
    Product.distinct("brand"),
  ]);

  // console.log(categories);
  // console.log(brands);

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
  const { title, description, price, image, category, brand, countInStock } =
    req.body;

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
      error: ["Error al eliminar el producto"],
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
