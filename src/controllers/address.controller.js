const { request, response } = require('express');

const getAddress = (req = request, res = response) => {
  return res.status(200).json({
    message: 'Get Address',
  });
};

const createAddress = (req = request, res = response) => {
  return res.status(201).json({
    message: 'Create Address',
  });
};

const updateAddress = (req = request, res = response) => {
  return res.status(200).json({
    message: 'Update Address',
  });
};

const deleteAddress = (req = request, res = response) => {
  return res.status(200).json({
    message: 'Delete Address',
  });
};

module.exports = {
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
};
