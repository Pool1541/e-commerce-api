const { Router } = require('express');
const { getAddress, createAddress, updateAddress } = require('../controllers/address.controller');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validateJWT');
const validateInputs = require('../middlewares/validateInputs');
const { userExist } = require('../helpers/db-validations');

const router = Router();

router.get(
  '/:id',
  [validateJWT, check('id').isMongoId().withMessage('id is not valid'), validateInputs],
  getAddress
);

router.post(
  '/',
  [
    validateJWT,
    check('country')
      .notEmpty()
      .withMessage('country is required')
      .isLength({
        max: 50,
        min: 2,
      })
      .withMessage('country must be between 2 and 50 characters')
      .custom((country) => {
        if (!isNaN(country)) {
          throw new Error('country should be a string');
        }
        return true;
      }),
    check('city')
      .notEmpty()
      .withMessage('city is required')
      .isLength({
        max: 50,
        min: 2,
      })
      .withMessage('city must be between 2 and 50 characters')
      .custom((city) => {
        if (!isNaN(city)) {
          throw new Error('city should be a string');
        }
        return true;
      }),
    check('district')
      .notEmpty()
      .withMessage('district is required')
      .isLength({
        max: 50,
        min: 2,
      })
      .withMessage('district must be between 2 and 50 characters')
      .custom((district) => {
        if (!isNaN(district)) {
          throw new Error('district should be a string');
        }
        return true;
      }),
    check('avenue')
      .notEmpty()
      .withMessage('avenue is required')
      .isLength({
        max: 50,
        min: 2,
      })
      .withMessage('avenue must be between 2 and 50 characters')
      .custom((avenue) => {
        if (!isNaN(avenue)) {
          throw new Error('avenue should be a string');
        }
        return true;
      }),
    check('number')
      .notEmpty()
      .withMessage('number is required')
      .isInt({
        min: 0,
      })
      .withMessage('number should be a positive number'),
    check('department')
      .notEmpty()
      .withMessage('department is required')
      .isInt({
        min: 0,
        max: 9999,
      })
      .withMessage('department should be a positive number'),
    check('zipCode')
      .notEmpty()
      .withMessage('zipCode is required')
      .isLength({
        max: 5,
        min: 5,
      })
      .withMessage('zipCode must be 5 characters')
      .isInt({
        min: 0,
      })
      .withMessage('zipCode should be a positive number'),
    check('user')
      .notEmpty()
      .withMessage('user is required')
      .isMongoId()
      .withMessage('user is not valid')
      .custom(userExist),
    validateInputs,
  ],
  createAddress
);

router.patch(
  '/:id',
  [
    validateJWT,
    check('id').notEmpty().withMessage('id is required').isMongoId().withMessage('id is not valid'),
    check('country')
      .optional()
      .isLength({
        max: 50,
        min: 2,
      })
      .withMessage('country must be between 2 and 50 characters')
      .custom((country) => {
        if (!isNaN(country)) {
          throw new Error('country should be a string');
        }
        return true;
      }),
    check('city')
      .optional()
      .isLength({
        max: 50,
        min: 2,
      })
      .withMessage('city must be between 2 and 50 characters')
      .custom((city) => {
        if (!isNaN(city)) {
          throw new Error('city should be a string');
        }
        return true;
      }),
    check('district')
      .optional()
      .isLength({
        max: 50,
        min: 2,
      })
      .withMessage('district must be between 2 and 50 characters')
      .custom((district) => {
        if (!isNaN(district)) {
          throw new Error('district should be a string');
        }
        return true;
      }),
    check('avenue')
      .optional()
      .isLength({
        max: 50,
        min: 2,
      })
      .withMessage('avenue must be between 2 and 50 characters')
      .custom((avenue) => {
        if (!isNaN(avenue)) {
          throw new Error('avenue should be a string');
        }
        return true;
      }),
    check('number')
      .optional()
      .isInt({
        min: 0,
      })
      .withMessage('number should be a positive number'),
    check('department')
      .optional()
      .isInt({
        min: 0,
        max: 9999,
      })
      .withMessage('department should be a positive number'),
    check('zipCode')
      .optional()
      .isLength({
        max: 5,
        min: 5,
      })
      .withMessage('zipCode must be 5 characters')
      .isInt({
        min: 0,
      })
      .withMessage('zipCode should be a positive number'),
    validateInputs,
  ],
  updateAddress
);

module.exports = router;
