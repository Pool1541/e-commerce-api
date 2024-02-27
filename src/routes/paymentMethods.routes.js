const { Router } = require('express');
const {
  getPaymentMethodsByUser,
  getPaymentMethod,
  createPaymentMethod,
  deletePaymentMethod,
} = require('../controllers/paymentMethods.controller');
const { check } = require('express-validator');
const validateInputs = require('../middlewares/validateInputs');
const { validateJWT } = require('../middlewares/validateJWT');
const { userExist, isValidCreditCard } = require('../helpers/db-validations');

const router = Router();

/**
 * Fix:
 * Validar en todas las rutas(excepto POST) que el id de usuario extraído del jwt sea el mismo que el id de usuario del método de pago.
 */

router.get(
  '/:id',
  [
    validateJWT,
    check('id').isMongoId().withMessage('id is not valid').custom(userExist),
    validateInputs,
  ],
  getPaymentMethodsByUser
);

router.get(
  '/:id',
  [validateJWT, check('id').isMongoId().withMessage('id is not valid'), validateInputs],
  getPaymentMethod
);

router.post(
  '/',
  [
    validateJWT,
    check('cardName')
      .notEmpty()
      .withMessage('cardName is required')
      .custom((cardName) => {
        if (!isNaN(cardName)) {
          throw new Error('cardName should be a string');
        }
        return true;
      })
      .isLength({ max: 50, min: 5 })
      .withMessage('cardName must be between 5 and 50 characters'),
    check('cardNumber')
      .notEmpty()
      .withMessage('cardNumber is required')
      .isNumeric()
      .withMessage('cardNumber should be a number')
      .isLength({ max: 16, min: 15 })
      .withMessage('cardNumber must be between 15 and 16 characters')
      .custom(isValidCreditCard),
    check('expirationDate')
      .notEmpty()
      .withMessage('expirationDate is required')
      .isDate()
      .withMessage('expirationDate should be a date')
      .isAfter()
      .withMessage('expirationDate should be after today'),
    check('securityCode')
      .notEmpty()
      .withMessage('securityCode is required')
      .isNumeric()
      .withMessage('securityCode should be a number')
      .isLength({ min: 3, max: 4 })
      .withMessage('securityCode must be between 3 and 4 characters'),
    check('user')
      .notEmpty()
      .withMessage('user is required')
      .isMongoId()
      .withMessage('user should be a mongoId')
      .custom(userExist),
    validateInputs,
  ],
  createPaymentMethod
);

router.delete(
  '/:id',
  [validateJWT, check('id').isMongoId().withMessage('id is not valid')],
  deletePaymentMethod
);

module.exports = router;
