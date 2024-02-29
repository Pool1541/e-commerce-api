const { AES, enc } = require('crypto-js');

const encryptData = (data = []) => {
  try {
    return data.map((value) => {
      return AES.encrypt(value, process.env.CRYPTO_SECRET_KEY).toString();
    });
  } catch (error) {
    throw new Error('Error during encryption');
  }
};

const decryptData = (data = []) => {
  try {
    return data.map((value) => {
      const bytes = AES.decrypt(value, process.env.CRYPTO_SECRET_KEY);
      return bytes.toString(enc.Utf8);
    });
  } catch (error) {
    console.log(error);
    throw new Error('Error during decryption');
  }
};

module.exports = {
  encryptData,
  decryptData,
};
