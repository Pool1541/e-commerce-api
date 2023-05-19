const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "the name is required"],
  },
  username: {
    type: String,
    required: [true, "the username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "the email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "the password is required"],
  },
  image: {
    type: String,
    default: "",
  },
  status: {
    type: Boolean,
    default: true,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...rest } = this.toObject();
  rest.uid = _id;
  return rest;
};

module.exports = model("User", UserSchema);
