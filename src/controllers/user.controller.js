const { request, response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT, generateRefreshJWT } = require("../helpers/generateJWT");

const getUserInfo = async (req = request, res = response) => {
  // TODO: Esta ruta es para usuarios normales
  // ✅Debería traer solo la información del usuario que está solicitando la petición de sus datos.
  // ✅Debería validarse que el token de acceso pertenezca al usuario que está solicitando los datos.
  // ✅Endpoint : /api/users/:id
  // ✅headers : Autorization : <token>
  // ✅Method : GET
  const { id } = req.params;
  const user = await User.findById(id);

  res.json({
    user,
  });
};

const createUser = async (req = request, res = response) => {
  // TODO: Esta ruta es solo para usuarios normales
  // ✅Cada usuario puede registrarse enviando sus datos en el req.body
  // ✅El correo debe ser válido y único.
  // ✅El username debe ser único.
  // ✅La contraseña debe tener más de 6 caracteres
  // ✅Endpoint : /api/users
  // ✅Method : POST
  // ✅body : name, username, email, password | REQUERIDOS
  //          image | OPCIONAL
  const { name, username, email, password } = req.body;

  const user = new User({ name, username, email, password });
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();
  const [token, refreshToken] = await Promise.all([
    generateJWT(user.id),
    generateRefreshJWT(user.id, res),
  ]);

  res.json({
    message: "User created successfully",
    user,
    stsTokenManager: {
      ...token,
      message: refreshToken,
    },
  });
};

const changePassword = async (req = request, res = response) => {
  // TODO - Para que un usuario cambie su contraseña necesita :
  // ✅Logearse con su cuenta y obtener un token válido
  // ✅Solicitar la eliminación de la cuenta a través del endpoint y el método correcto
  // ✅Enviar a través de la solicitud http tanto el uid en los parámetros como el token en los headers
  // ✅El uid que contiene el payload del token debe ser el mismo que el uid del parámetro en la solicitud http
  // Solicitar la contraseña anterior como validación adicional.
  const { password } = req.body;
  const { id } = req.params;

  const salt = bcryptjs.genSaltSync();
  const newPassword = bcryptjs.hashSync(password, salt);

  await User.findByIdAndUpdate(id, { password: newPassword });

  res.json({
    message: "Password has been changed successfully.",
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
  // Solicitar la contraseña como validación adicional.
  const user = await User.findByIdAndUpdate(id, { status: false });

  res.json({ message: `${user.name} your account has been deleted` });
};

module.exports = {
  getUserInfo,
  createUser,
  changePassword,
  changeUser,
  deleteUser,
};
