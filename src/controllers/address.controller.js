const { request, response } = require('express');

const getAddress = (req = request, res = response) => {
  return res.status(200).json({
    message: 'Get Address',
  });
};

module.exports = {
  getAddress,
};
