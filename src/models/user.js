const { Schema, model } = require('mongoose');
const path = require('path');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'the name is required'],
  },
  username: {
    type: String,
    required: [true, 'the username is required'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'the email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'the password is required'],
  },
  role: {
    type: String,
    default: 'USER',
  },
  image: {
    type: String,
    default:
      'https://res.cloudinary.com/dj6kd6xui/image/upload/v1694712371/iynpbsfbjdclv4bvy36x.webp',
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

module.exports = model('User', UserSchema);
