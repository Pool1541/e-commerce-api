const { request, response } = require('express');
const PaymentMethod = require('../models/payment-method');
const { encryptData, decryptData } = require('../helpers/crypto');
const { hideCardNumber } = require('../helpers/hideCardNumber');

const getPaymentMethodsByUser = (req = request, res = response) => {};

const getPaymentMethod = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { _id: uid } = req.user;

    const paymentMethod = await PaymentMethod.findById(id);

    if (!paymentMethod) return res.status(404).json({ error: ['Payment method not found'] });

    if (uid.toString() !== paymentMethod.user.toString())
      return res.status(401).json({ error: ['Not authorized'] });

    let { _id, cardNumber, expirationDate } = paymentMethod;

    cardNumber = hideCardNumber(decryptData([cardNumber])[0]);

    return res.status(200).json({
      data: {
        _id,
        cardNumber,
        expirationDate,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: ['Something went wrong'] });
  }
};

const createPaymentMethod = async (req = request, res = response) => {
  const { cardName, cardNumber, expirationDate, securityCode, user } = req.body;

  try {
    const [cipherCardNumber, cipherSecurityCode] = encryptData([cardNumber, securityCode]);

    const paymentMethod = new PaymentMethod({
      cardName,
      cardNumber: cipherCardNumber,
      expirationDate,
      securityCode: cipherSecurityCode,
      user,
    });

    await paymentMethod.save();

    return res.status(201).json({
      data: 'PaymentMethod created succesfuly',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: ['Something went wrong'],
    });
  }
};

const deletePaymentMethod = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { _id: uid } = req.user;

    const paymentMethod = await PaymentMethod.findById(id);
    if (!paymentMethod) return res.status(404).json({ error: ['Payment method not found'] });

    if (uid.toString() !== paymentMethod.user.toString())
      return res.status(401).json({ error: ['Not authorized'] });

    await paymentMethod.deleteOne();
    return res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: ['Something went wrong'] });
  }
};

module.exports = {
  getPaymentMethodsByUser,
  getPaymentMethod,
  createPaymentMethod,
  deletePaymentMethod,
};
