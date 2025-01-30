const mongoose = require('mongoose');
const { MONGODB_CONNECTION } = require('../helpers/environment');

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
    throw new Error(`Couldn't connect to MongoDB: ${MONGODB_CONNECTION}`);
  }
};

module.exports = dbConnection;
