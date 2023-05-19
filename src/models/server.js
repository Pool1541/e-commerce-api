const express = require("express");
const cors = require("cors");
const dbConnection = require("../database/config");
const userRouter = require("../routes/user.routes");
const productRouter = require("../routes/product.routes");
const categoryRouter = require("../routes/category.routes");
const authRouter = require("../routes/auth.routes");

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 8080;
    this.userPath = "/api/users";
    this.productPath = "/api/products";
    this.categoryPath = "/api/category";
    this.authPath = "/api/auth";

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  async connectDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.authPath, authRouter);
    this.app.use(this.userPath, userRouter);
    this.app.use(this.productPath, productRouter);
    this.app.use(this.categoryPath, categoryRouter);
  }

  start() {
    this.app.listen(this.PORT, () =>
      console.log("Running on port " + this.PORT)
    );
  }
}

module.exports = Server;
