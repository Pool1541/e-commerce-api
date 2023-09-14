const { response } = require('express');

const validateFiles = (req, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      error: 'No file was selected to upload',
    });
  }

  next();
};

module.exports = { validateFiles };
