const { Router } = require("express");
const { check } = require("express-validator");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const {
  productTitleExists,
  categoryExists,
} = require("../helpers/db-validations");
const validateInputs = require("../middlewares/validateInputs");
const { validateJWT } = require("../middlewares/validateJWT");
const { hasRole } = require("../middlewares/validateRole");
const router = Router();

router.get("/", getProducts);
router.post(
  "/",
  [
    validateJWT,
    hasRole("ADMIN", "SUPER_ADMIN"),
    check("title", "title is required").notEmpty().custom(productTitleExists),
    check("description", "description is required").notEmpty(),
    check("price", "price is required")
      .notEmpty()
      .isNumeric()
      .withMessage("price is not a number"),
    check("image", "image is required").notEmpty(),
    check("category", "category is required").notEmpty().custom(categoryExists),
    check("countInStock", "countInStock is required")
      .notEmpty()
      .isNumeric()
      .withMessage("countInStock is not a number"),
    validateInputs,
  ],
  createProduct
);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
