const { AES } = require('crypto-js');

const encryptData = (data = []) => {
  try {
    return data.map((value) => {
      return AES.encrypt(value, process.env.CRYPTO_SECRET_KEY).toString();
    });
  } catch (error) {
    throw new Error('Error during encryption');
  }
};

module.exports = {
  encryptData,
};
