const { Router } = require('express');
const { getPaymentMethodsByUser } = require('../controllers/billing.controller');
const { check } = require('express-validator');
const validateInputs = require('../middlewares/validateInputs');
const { validateJWT } = require('../middlewares/validateJWT');
const { userExist } = require('../helpers/db-validations');
const { validateOwnerUser } = require('../middlewares/validateOwnerUser');

const router = Router();

router.get(
  '/:id',
  [
    validateJWT,
    check('id', 'user not found').isMongoId().custom(userExist),
    validateInputs,
    validateOwnerUser,
  ],
  getPaymentMethodsByUser
);

module.exports = router;
