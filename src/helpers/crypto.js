const { AES, enc } = require('crypto-js');
const { hideCardNumber } = require('./hideCardNumber');

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

const decryptCards = (data) => {
  const decryptCardNumber = (value) => hideCardNumber(decryptData([value])[0]);

  if (data instanceof Array)
    return data.map((value) => ({
      ...value,
      cardNumber: decryptCardNumber(value.cardNumber),
    }));
  if (data instanceof Object)
    return {
      ...data,
      cardNumber: decryptCardNumber(data.cardNumber),
    };
  else throw new Error('Invalid data type');
};

module.exports = {
  encryptData,
  decryptData,
  decryptCards,
};
