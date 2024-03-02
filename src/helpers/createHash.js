const { SHA256, enc } = require('crypto-js');

const createHash = (cardNumber, expirationDate) => {
  const data = cardNumber + expirationDate;
  const hash = SHA256(data).toString(enc.Hex);

  return hash;
};

module.exports = {
  createHash,
};
