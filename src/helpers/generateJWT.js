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
          reject("No se pudo crear el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
