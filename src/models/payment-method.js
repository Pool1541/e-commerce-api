const { Schema, model } = require('mongoose');

const PaymentMethodSchema = new Schema({
  cardName: {
    type: String,
    unique: true,
    required: true,
  },
  cardNumber: {
    type: Number,
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
