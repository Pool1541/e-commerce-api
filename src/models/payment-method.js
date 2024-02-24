const { Schema, model } = require('mongoose');

const PaymentMethodSchema = new Schema({
  cardName: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  securityCode: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = model('PaymentMethod', PaymentMethodSchema);
