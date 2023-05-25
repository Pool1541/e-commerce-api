const { Router } = require("express");
const {
  login,
  sendNewAuthToken,
  logout,
} = require("../controllers/auth.controller");
const { check } = require("express-validator");
const validateInputs = require("../middlewares/validateInputs");
const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").notEmpty(),
    validateInputs,
  ],
  login
);

router.get("/refresh", sendNewAuthToken);

router.get("/logout", logout);

module.exports = router;
