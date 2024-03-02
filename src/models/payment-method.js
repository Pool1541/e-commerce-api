const { Schema, model } = require('mongoose');

const PaymentMethodSchema = new Schema({
  cardName: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    unique: true,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  securityCode: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  hash: {
    type: String,
    require: true,
  },
});

module.exports = model('PaymentMethod', PaymentMethodSchema);
