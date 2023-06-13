const { Router } = require("express");
const { check } = require("express-validator");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/product.controller");
const {
  productTitleExists,
  categoryExists,
  productExist,
} = require("../helpers/db-validations");
const validateInputs = require("../middlewares/validateInputs");
const { validateJWT } = require("../middlewares/validateJWT");
const { hasRole } = require("../middlewares/validateRole");
const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
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
    check("brand", "brand is required").notEmpty(),
    check("countInStock", "countInStock is required")
      .notEmpty()
      .isNumeric()
      .withMessage("countInStock is not a number"),
    validateInputs,
  ],
  createProduct
);
router.put("/:id", updateProduct);

router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("ADMIN", "SUPER_ADMIN"),
    check("id").isMongoId().custom(productExist),
    validateInputs,
  ],
  deleteProduct
);

module.exports = router;
