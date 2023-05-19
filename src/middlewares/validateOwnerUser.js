const { request, response } = require("express");

const validateOwnerUser = (req = request, res = response, next) => {
  // ✅ validar que el uid del req.user que corresponde al token sea el mismo que el uid del usuario que se está solicitando eliminar (params)
  const { id: uidFromToken } = req.user;
  const uidFromParams = req.params.id;

  if (uidFromToken !== uidFromParams) {
    return res.status(403).json({
      message: "You do not have permission for this user",
    });
  }

  next();
};

module.exports = { validateOwnerUser };
