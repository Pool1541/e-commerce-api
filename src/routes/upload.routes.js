const { Router } = require('express');
const { check } = require('express-validator');
const { sendImage, uploadImage } = require('../controllers/uploads.controller');
const { validateFiles } = require('../middlewares/validateFiles');
const validateInputs = require('../middlewares/validateInputs');
const { validateJWT } = require('../middlewares/validateJWT');
const { isAllowedCollection } = require('../helpers/db-validations');
const { isAuthorized } = require('../middlewares/isAuthorized');

const router = Router();

router.get('/', sendImage);
router.post(
  '/:collection/:id',
  [
    validateJWT,
    validateFiles,
    check('id', 'id is not valid').isMongoId(),
    check('collection').custom((collection) =>
      isAllowedCollection(collection, ['users', 'products'])
    ),
    validateInputs,
    isAuthorized,
  ],
  uploadImage
);

module.exports = router;
