const { request, response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [count, usersResult] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    count,
    usersResult,
  });
};

const createUser = async (req = request, res = response) => {
  const { name, username, email, password, image } = req.body;

  const user = new User({ name, username, email, password, image });
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({ message: "User created successfully", user });
};

const changePassword = async (req = request, res = response) => {
  const { password } = req.body;
  const { id } = req.params;

  const salt = bcryptjs.genSaltSync();
  const newPassword = bcryptjs.hashSync(password, salt);

  const user = await User.findByIdAndUpdate(id, { password: newPassword });
  res.json({
    message: "Password changed",
    oldPassword: user.password,
    newPassword: newPassword,
  });
};

const changeUser = (req = request, res = response) => {
  res.json({ message: "Put method from user controller" });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  // TODO - Para que un usuario elimine su propia cuenta necesita :
  // ✅Logearse con su cuenta y obtener un token válido
  // ✅Solicitar la eliminación de la cuenta a través del endpoint y el método correcto
  // ✅Enviar a través de la solicitud http tanto el uid en los parámetros como el token en los headers
  // ✅El uid que contiene el payload del token debe ser el mismo que el uid del parámetro en la solicitud http

  const user = await User.findByIdAndUpdate(id, { status: false });

  res.json({ message: `${user.name} your account has been deleted` });
};

module.exports = {
  getUsers,
  createUser,
  changePassword,
  changeUser,
  deleteUser,
};
