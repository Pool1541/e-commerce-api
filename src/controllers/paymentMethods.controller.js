const { request, response } = require('express');
const PaymentMethod = require('../models/payment-method');
const { encryptData, decryptData, decryptCards } = require('../helpers/crypto');
const { hideCardNumber } = require('../helpers/hideCardNumber');
const { createHash } = require('../helpers/createHash');

const getPaymentMethodsByUser = async (req = request, res = response) => {
  const { _id: id } = req.user;

  try {
    const paymentMethods = await PaymentMethod.find({ user: id });

    if (paymentMethods.length === 0) return res.status(200).json({ data: [] });

    const decryptedCards = decryptCards(
      paymentMethods.map(({ cardNumber, _id, expirationDate }) => ({
        _id,
        cardNumber,
        expirationDate,
      }))
    );

    return res.status(200).json({
      data: decryptedCards,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: ['Something went wrong'] });
  }
};

const getPaymentMethod = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id: uid } = req.user;

  try {
    const paymentMethod = await PaymentMethod.findById(id);

    if (!paymentMethod) return res.status(404).json({ error: ['Payment method not found'] });

    if (uid.toString() !== paymentMethod.user.toString())
      return res.status(401).json({ error: ['Not authorized'] });

    let { _id, cardNumber, expirationDate } = paymentMethod;
    const decryptedCard = decryptCards({ _id, cardNumber, expirationDate });

    return res.status(200).json({
      data: decryptedCard,
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

    const hash = createHash(cardNumber, expirationDate);

    const paymentMethodExists = await PaymentMethod.findOne({ hash, user });

    if (paymentMethodExists)
      return res.status(400).json({ error: ['Payment method already exists'] });

    const paymentMethod = new PaymentMethod({
      cardName,
      cardNumber: cipherCardNumber,
      expirationDate,
      securityCode: cipherSecurityCode,
      user,
      hash,
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
  const { id } = req.params;
  const { _id: uid } = req.user;

  try {
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
