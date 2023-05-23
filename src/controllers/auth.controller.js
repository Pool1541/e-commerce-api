const { request, response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT, generateRefreshJWT } = require("../helpers/generateJWT");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: ["User  not found"] });
    }

    if (!user.status) {
      return res.status(400).json({ error: ["User is not active"] });
    }

    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: ["Wrong password"] });
    }

    const [token, refreshtokenResponse] = await Promise.all([
      generateJWT(user.id),
      generateRefreshJWT(user.id, res),
    ]);

    res.json({
      user,
      stsTokenManager: {
        ...token,
        message: refreshtokenResponse,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: ["Something went wrong"],
    });
  }
};

module.exports = {
  login,
};
