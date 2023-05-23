const { validationResult } = require("express-validator");

const validateInputs = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors
      .array({ onlyFirstError: true })
      .map((err) => err.msg);
    return res.status(400).json({ error: errorsArray });
  }
  next();
};

module.exports = validateInputs;
