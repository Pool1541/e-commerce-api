const { Schema, model } = require('mongoose');

const AddressSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  avenue: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  department: {
    type: Number,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = model('Address', AddressSchema);
