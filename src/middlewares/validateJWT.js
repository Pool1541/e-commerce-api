const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: ['No token provided'] });
  }

  try {
    const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({ error: ['Invalid token : user does not exist'] });
    }

    if (!user.status) {
      return res.status(401).json({ error: ['Invalid token : user is not active'] });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: ['Invalid token'] });
  }
};

module.exports = { validateJWT };
