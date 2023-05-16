const Category = require("../models/category");
const product = require("../models/product");
const User = require("../models/user");
const mongoose = require("mongoose");

const idExist = async (id = "") => {
  let objectId;
  try {
    objectId = new mongoose.Types.ObjectId(id);
  } catch (err) {}
  const idExists = await User.findById(objectId);
  if (!idExists) {
    throw new Error("User not found");
  }
};

const emailExists = async (email = "") => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error("Email already exists");
  }
};

const usernameExists = async (username = "") => {
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    throw new Error("Username already exists");
  }
};

const categoryExists = async (name = "") => {
  const categoryExists = await Category.findOne({ name });
  if (!categoryExists) {
    throw new Error("Category not found");
  }
};

const productTitleExists = async (title = "") => {
  const productTitleExists = await product.findOne({ title });
  if (productTitleExists) {
    throw new Error("Product already exists");
  }
};

module.exports = {
  emailExists,
  usernameExists,
  idExist,
  categoryExists,
  productTitleExists,
};
