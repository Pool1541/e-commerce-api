const { Router } = require("express");
const { getFilters } = require("../controllers/filter.controller");
const router = Router();

router.get("/", getFilters);

module.exports = router;
