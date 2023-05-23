const jwt = require("jsonwebtoken");

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    const expiresIn = 60 * 15;
    jwt.sign(
      payload,
      process.env.PRIVATE_KEY,
      { expiresIn },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("Couldn't create token");
        } else {
          resolve({ token, expiresIn });
        }
      }
    );
  });
};

const generateRefreshJWT = (uid = "", res) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    const expiresIn = 60 * 60 * 24 * 30;
    jwt.sign(
      payload,
      process.env.PRIVATE_REFRESH_KEY,
      { expiresIn },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("Couldn't create refresh token");
        } else {
          res.cookie("refreshtoken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
          });
          resolve("Refresh token saved on cookie");
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
  generateRefreshJWT,
};
