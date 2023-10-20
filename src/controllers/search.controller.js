const { request, response } = require('express');
const Product = require('../models/product');

const search = async (req = request, res = response) => {
  const { keyword } = req.query;

  const regex = new RegExp(keyword, 'i');
  try {
    const [count, results] = await Promise.all([
      Product.countDocuments({
        $or: [{ title: regex }, { brand: { $regex: regex } }],
      }),
      Product.find({
        $or: [{ title: regex }, { brand: { $regex: regex } }],
      }),
    ]);

    res.json({
      count,
      results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: ['Algo ha salido mal'] });
  }
};

module.exports = {
  search,
};
