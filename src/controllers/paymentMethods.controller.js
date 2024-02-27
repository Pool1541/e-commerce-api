const { request, response } = require('express');
const PaymentMethod = require('../models/payment-method');

const getPaymentMethodsByUser = (req = request, res = response) => {};

const getPaymentMethod = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { _id: uid } = req.user;

    const paymentMethod = await PaymentMethod.findById(id);

    if (!paymentMethod) return res.status(404).json({ error: ['Payment method not found'] });

    if (uid.toString() !== paymentMethod.user.toString())
      return res.status(401).json({ error: ['Not authorized'] });

    return res.status(200).json({ data: paymentMethod });
  } catch (error) {
    return res.status(500).json({ error: ['Something went wrong'] });
  }
};

const createPaymentMethod = async (req = request, res = response) => {
  const { cardName, cardNumber, expirationDate, securityCode, user } = req.body;

  try {
    const paymentMethod = new PaymentMethod({
      cardName,
      cardNumber,
      expirationDate,
      securityCode,
      user,
    });

    await paymentMethod.save();

    return res.status(201).json({
      data: 'PaymentMethod created succesfuly',
    });
  } catch (error) {
    return res.status(500).json({
      error: ['Something went wrong'],
    });
  }
};

const deletePaymentMethod = (req = request, res = response) => {};

module.exports = {
  getPaymentMethodsByUser,
  getPaymentMethod,
  createPaymentMethod,
  deletePaymentMethod,
};
