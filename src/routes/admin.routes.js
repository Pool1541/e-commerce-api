const { Router } = require("express");
const { getUsers } = require("../controllers/admin.controller");
const { validateJWT } = require("../middlewares/validateJWT");
const { hasRole } = require("../middlewares/validateRole");
const router = Router();

router.get("/", [validateJWT, hasRole("SUPER_ADMIN")], getUsers);

module.exports = router;
