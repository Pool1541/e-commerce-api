const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/generateJWT");

const getUsers = async (req = request, res = response) => {
  // ✅TODO: Esta ruta es para el super administrador
  // ✅Debería traer la información de todos los usuarios activos según las querys.
  // ✅Debería validarse que el token de acceso pertenezca al super administrador además del rol.
  // ✅Endpoint : /api/admin/
  // ✅headers : Autorization : <token>
  // ✅query : limit, from
  // ✅Method : GET

  const { limit = 10, from = 0 } = req.query;
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

const createAdmin = async (req = request, res = response) => {
  const { name, username, email, password } = req.body;
  const role = "ADMIN";

  const user = new User({
    name,
    username,
    email,
    password,
    role,
  });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  const [_, token] = await Promise.all([user.save(), generateJWT(user.id)]);

  res.json({
    message: "User created successfully",
    user,
    token,
  });
};

module.exports = {
  getUsers,
  createAdmin,
};
