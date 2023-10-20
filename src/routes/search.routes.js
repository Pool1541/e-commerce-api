const { Router } = require('express');
const { search } = require('../controllers/search.controller');
const { check } = require('express-validator');
const validateInputs = require('../middlewares/validateInputs');

const router = Router();

router.get(
  '/',
  [check('keyword', 'La keyword no debe estar vacía').trim().notEmpty(), validateInputs],
  search
);

module.exports = router;
