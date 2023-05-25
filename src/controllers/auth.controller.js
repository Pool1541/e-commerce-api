const { request, response } = require("express");
const jwt = require("jsonwebtoken");
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

const sendNewAuthToken = async (req, res) => {
  try {
    const refreshTokenByCookie = req.cookies.refreshToken;
    if (!refreshTokenByCookie) {
      return res.status(400).json({ error: ["Refresh token not provided"] });
    }

    const { uid } = jwt.verify(
      refreshTokenByCookie,
      process.env.PRIVATE_REFRESH_KEY
    );

    const { token, expiresIn } = await generateJWT(uid);

    return res.json({ stsTokenManager: { token, expiresIn } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: ["Something went wrong"],
    });
  }
};

const logout = (req, res = response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ message: "Session has been cleared." });
};

module.exports = {
  login,
  sendNewAuthToken,
  logout,
};
