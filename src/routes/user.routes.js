const { Router } = require('express');
const { check } = require('express-validator');
const {
  createUser,
  deleteUser,
  getUserInfo,
  changePassword,
  updateUser,
} = require('../controllers/user.controller');
const validateInputs = require('../middlewares/validateInputs');
const {
  emailExists,
  usernameExists,
  userExist,
  usernameIsDifferentAndExist,
} = require('../helpers/db-validations');
const { validateJWT } = require('../middlewares/validateJWT');
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
  getUserInfo
);

router.post(
  '/',
  [
    check('name', 'name is required').notEmpty(),
    check('password', 'password need more than 6 characters').isLength({
      min: 7,
    }),
    check('username', 'username is required').notEmpty().custom(usernameExists),
    check('email', 'this email is not valid').isEmail().custom(emailExists),
    validateInputs,
  ],
  createUser
);

router.put(
  '/:id',
  [
    validateJWT,
    check('name', 'name is required').notEmpty(),
    check('username', 'username is required').notEmpty().custom(usernameIsDifferentAndExist),
    check('id').isMongoId().custom(userExist),
    validateInputs,
    validateOwnerUser,
  ],
  updateUser
);

router.patch(
  '/:id',
  [
    validateJWT,
    check('password', 'password need more than 6 characters').isLength({
      min: 7,
    }),
    check('id').isMongoId().custom(userExist),
    validateInputs,
    validateOwnerUser,
  ],
  changePassword
);

router.delete(
  '/:id',
  [validateJWT, check('id').isMongoId().custom(userExist), validateInputs, validateOwnerUser],
  deleteUser
);

module.exports = router;
