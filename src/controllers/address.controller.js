const { request, response } = require('express');
const Address = require('../models/address');

const getAddress = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { _id: uid } = req.user;

    const address = await Address.findOne({ user: id });

    if (!address) return res.status(200).json({ data: null });
    if (uid.toString() !== id.toString())
      return res.status(401).json({ error: ['Not authorized'] });

    return res.status(200).json({
      data: address,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: ['Something went wrong'] });
  }
};

const createAddress = async (req = request, res = response) => {
  try {
    const { user, country, city, district, avenue, number, department, zipCode } = req.body;
    const { _id: uid } = req.user;

    const hasAddress = await Address.findOne({ user });

    if (hasAddress)
      return res.status(409).json({ error: ['User already has a registered address'] });

    if (uid.toString() !== user.toString())
      return res.status(401).json({ error: ['Not authorized'] });

    const address = new Address({
      user,
      country,
      city,
      district,
      avenue,
      number,
      department,
      zipCode,
    });

    await address.save();

    return res.status(201).json({
      message: 'Address created succesfuly',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: ['Something went wrong'],
    });
  }
};

const updateAddress = (req = request, res = response) => {
  return res.status(200).json({
    message: 'Update Address',
  });
};

const deleteAddress = (req = request, res = response) => {
  return res.status(200).json({
    message: 'Delete Address',
  });
};

module.exports = {
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
};
