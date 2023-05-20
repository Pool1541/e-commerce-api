const { request, response } = require("express");
const User = require("../models/user");

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

module.exports = {
  getUsers,
};
