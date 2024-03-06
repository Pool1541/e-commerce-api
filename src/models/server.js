const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 8080;
    this.userPath = '/api/users';
    this.productPath = '/api/products';
    this.categoryPath = '/api/category';
    this.authPath = '/api/auth';
    this.adminPath = '/api/admin';
    this.filterPath = '/api/filters';
    this.uploadsPath = '/api/uploads';
    this.subCategoryPath = '/api/subcategories';
    this.searchPath = '/api/search';
    this.paymentMethodsPath = '/api/paymentMethods';
    this.addressPath = '/api/address';
    this.origin =
      process.env.NODE_ENV === 'production'
        ? 'https://pool1541.github.io/e-commerce'
        : 'http://127.0.0.1:5173';

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(
      cors({
        credentials: true,
        origin: true,
      })
    );
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.static('public'));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
      })
    );
  }

  async connectDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth.routes'));
    this.app.use(this.adminPath, require('../routes/admin.routes'));
    this.app.use(this.userPath, require('../routes/user.routes'));
    this.app.use(this.productPath, require('../routes/product.routes'));
    this.app.use(this.categoryPath, require('../routes/category.routes'));
    this.app.use(this.filterPath, require('../routes/filter.routes'));
    this.app.use(this.uploadsPath, require('../routes/upload.routes'));
    this.app.use(this.subCategoryPath, require('../routes/subCategory.routes'));
    this.app.use(this.searchPath, require('../routes/search.routes'));
    this.app.use(this.paymentMethodsPath, require('../routes/paymentMethods.routes'));
    this.app.use(this.addressPath, require('../routes/address.routes'));
  }

  start() {
    this.app.listen(this.PORT, () => console.log('Running on port ' + this.PORT));
  }
}

module.exports = Server;
