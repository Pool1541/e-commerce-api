const { response, request } = require('express');
const fs = require('fs').promises;
const path = require('path');
const bcryptjs = require('bcryptjs');
const { cleanDocuments } = require('../database/utils');
const { Product, Category, SubCategory, Role, User } = require('../models');

async function seed(req = request, res = response) {
  try {
    const adminExists = await User.findOne({ email: 'admin@e-mporium.com' });
    
    // Verificar si ya hay productos
    const productsCount = await Product.countDocuments();

    if (adminExists || productsCount > 0) {
      return res.status(400).json({
        message: 'Seed was already executed. Database already contains information.'
      });
    }

    const ProductsjsonPath = path.join(__dirname, '../../e-commerce.products.json');
    const ProductsjsonData = await fs.readFile(ProductsjsonPath, 'utf8');
    const products = JSON.parse(ProductsjsonData);

    const CategoriesjsonPath = path.join(__dirname, '../../e-commerce.categories.json');
    const CategoriesjsonData = await fs.readFile(CategoriesjsonPath, 'utf8');
    const categories = JSON.parse(CategoriesjsonData);

    const SubCategoriesjsonPath = path.join(__dirname, '../../e-commerce.subcategories.json');
    const SubCategoriesjsonData = await fs.readFile(SubCategoriesjsonPath, 'utf8');
    const subCategories = JSON.parse(SubCategoriesjsonData);

    const RolesjsonPath = path.join(__dirname, '../../e-commerce.roles.json');
    const RolesjsonData = await fs.readFile(RolesjsonPath, 'utf8');
    const roles = JSON.parse(RolesjsonData);

    const cleanedProducts = cleanDocuments(products);
    const cleanedCategories = cleanDocuments(categories);
    const cleanedSubCategories = cleanDocuments(subCategories);
    const cleanedRoles = cleanDocuments(roles);

    const salt = bcryptjs.genSaltSync()
    const adminPassword = bcryptjs.hashSync('admin', salt);

    await Product.insertMany(cleanedProducts);
    await Category.insertMany(cleanedCategories);
    await SubCategory.insertMany(cleanedSubCategories);
    await Role.insertMany(cleanedRoles);
    await User.create({
      name: 'Admin',
      username: 'admin',
      email: 'admin@e-mporium.com',
      password: adminPassword,
      role: 'SUPER_ADMIN',
      status: true,
    });

    res.status(201).json({
      message: 'Collections imported',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error importing collections',
    });
  }
};

module.exports = seed;