const { Router } = require('express');
const seed = require('../controllers/seed.controller');

const router = Router();

router.get('/', seed);

module.exports = router;