const { Router } = require("express");
const { check } = require("express-validator");
const {
  createUser,
  deleteUser,
  getUsers,
  changePassword,
  changeUser,
} = require("../controllers/user.controller");
const validateInputs = require("../middlewares/validateInputs");
const {
  emailExists,
  usernameExists,
  idExist,
} = require("../helpers/db-validations");

const router = Router();

router.get("/", getUsers);
router.post(
  "/",
  [
    check("name", "name is required").notEmpty(),
    check("password", "password need more than 6 characters").isLength({
      min: 7,
    }),
    check("username", "username is required").notEmpty().custom(usernameExists),
    check("email", "this email is not valid").isEmail().custom(emailExists),
    validateInputs,
  ],
  createUser
);
router.put("/:id", changeUser);
router.patch(
  "/:id",
  [
    check("password", "password need more than 6 characters").isLength({
      min: 7,
    }),
    check("id").isMongoId().custom(idExist),
    validateInputs,
  ],
  changePassword
);
router.delete(
  "/:id",
  [check("id").isMongoId().custom(idExist), validateInputs],
  deleteUser
);

module.exports = router;
