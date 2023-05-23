const { request, response } = require("express");

const isSuperAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res
      .status(500)
      .json({ error: ["we must verify the token before validating the role"] });
  }
  const { role, name } = req.user;

  if (role !== "SUPER_ADMIN") {
    return res.status(401).json({
      error: [`${name} is not authorized for this action`],
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        error: [`${req.user.name} is not authorized for this action`],
      });
    }

    next();
  };
};

module.exports = {
  hasRole,
  isSuperAdminRole,
};
