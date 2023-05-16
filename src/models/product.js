const { Schema, model, Types } = require("mongoose");

const ProducthSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: Types.ObjectId,
    ref: "Category",
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
});

ProducthSchema.methods.toJSON = function () {
  const { __v, ...rest } = this.toObject();
  return rest;
};

module.exports = model("Product", ProducthSchema);
