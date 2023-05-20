const { Router } = require("express");
const { getUsers, createAdmin } = require("../controllers/admin.controller");
const { validateJWT } = require("../middlewares/validateJWT");
const { hasRole } = require("../middlewares/validateRole");
const { check } = require("express-validator");
const { usernameExists, emailExists } = require("../helpers/db-validations");
const validateInputs = require("../middlewares/validateInputs");
const router = Router();

router.get("/", [validateJWT, hasRole("SUPER_ADMIN")], getUsers);

router.post(
  "/",
  [
    validateJWT,
    hasRole("SUPER_ADMIN"),
    check("name", "name is required").notEmpty(),
    check("username", "username is required").notEmpty().custom(usernameExists),
    check("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("This email is not valid")
      .custom(emailExists),
    check("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({
        min: 6,
      })
      .withMessage("pasword needs to be more than 6 characters"),
    validateInputs,
  ],
  createAdmin
);

module.exports = router;
