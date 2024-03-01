const hideCardNumber = (number) => {
  let length = number.length;
  let firstNumbers = number.substring(0, 4);
  let lastNumbers = number.substring(length - 4);
  let asterisks = '*'.repeat(length - 8);
  let result = firstNumbers + asterisks + lastNumbers;

  return result;
};

module.exports = {
  hideCardNumber,
};
