const { response } = require('express');
const { validateOwnerUser } = require('../middlewares/validateOwnerUser');
const { hasRole } = require('../middlewares/validateRole');

const isAuthorized = async (req, res = response, next) => {
  const { collection } = req.params;

  switch (collection) {
    case 'users':
      validateOwnerUser(req, res, next);
      break;
    case 'products':
      hasRole('ADMIN', 'SUPER_ADMIN')(req, res, next);
      break;
    default:
      break;
  }
};

module.exports = {
  isAuthorized,
};
