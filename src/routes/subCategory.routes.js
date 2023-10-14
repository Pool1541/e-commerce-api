const { Router } = require('express');
const { createSubCategory, getSubCategories } = require('../controllers/subCategory.controller');
const router = Router();

router.get('/', getSubCategories);
router.post('/', createSubCategory);

module.exports = router;
