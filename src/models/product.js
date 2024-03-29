const { Schema, model, Types } = require('mongoose');

const ProducthSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  fullPrice: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
});

ProducthSchema.methods.toJSON = function () {
  const { __v, _id, ...rest } = this.toObject();
  rest.id = _id;
  return rest;
};

module.exports = model('Product', ProducthSchema);
