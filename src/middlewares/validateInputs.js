const { validationResult } = require("express-validator");

const validateInputs = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array({ onlyFirstError: true }).map((err) => ({
      message: err.msg,
      value: err.path,
    }));
    return res.status(400).json({ errors: errorsArray });
  }
  next();
};

module.exports = validateInputs;
