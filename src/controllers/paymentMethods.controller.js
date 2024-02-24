const { request, response } = require('express');

const getPaymentMethodsByUser = (req = request, res = response) => {};
const getPaymentMethod = (req = request, res = response) => {};
const createPaymentMethod = (req = request, res = response) => {
  const body = req.body;

  console.log(body);

  res.status(201).json({
    body,
  });
};

module.exports = {
  getPaymentMethodsByUser,
  getPaymentMethod,
  createPaymentMethod,
};
