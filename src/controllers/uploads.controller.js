const { response } = require('express');
const User = require('../models/user');
const path = require('path');
const product = require('../models/product');
const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const sendImage = async (req, res = response) => {
  // Validar el token de usuario para acceder a su información.
  // Validar si el usuario tiene una imagen personalizada o por defecto.
  const origin = `${req.protocol}://${req.get('host')}`;

  const imagePath = path.join(__dirname, '../assets/user-thumbnail.webp');

  res.sendFile(imagePath);
};

const uploadImage = async (req, res = response) => {
  const { collection, id } = req.params;
  const { role } = req.user;

  try {
    let model;

    switch (collection) {
      case 'users':
        model = await User.findById(id);
        if (!model) return res.status(400).json({ error: ['User does not exist'] });
        break;
      case 'products':
        if (role !== 'SUPER_ADMIN') return res.status(401).json({ error: ['Unauthorized'] });
        model = await product.findById(id);
        if (!model) return res.status(400).json({ error: ['Product does not exist'] });
        break;

      default:
        return res.status(500).json({ error: ['Collection not implemented, internal error'] });
    }

    if (model.image) {
      const [publicId] = model.image.split('/').at(-1).split('.');
      cloudinary.uploader.destroy(publicId);
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.image = secure_url;
    await model.save();

    res.json({
      message: 'Image uploaded successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: ['Internal error'] });
  }
};

module.exports = { sendImage, uploadImage };
