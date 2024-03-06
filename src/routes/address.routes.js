const { Router } = require('express');
const { getAddress } = require('../controllers/address.controller');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validateJWT');
const validateInputs = require('../middlewares/validateInputs');

const router = Router();

router.get(
  '/:id',
  [validateJWT, check('id').isMongoId().withMessage('id is not valid'), validateInputs],
  getAddress
);

module.exports = router;
