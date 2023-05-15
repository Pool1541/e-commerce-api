const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't connect to MongoDB");
  }
};

module.exports = dbConnection;
