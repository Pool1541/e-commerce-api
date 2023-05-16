const express = require("express");
const cors = require("cors");
const dbConnection = require("../database/config");
const userRouter = require("../routes/user.routes");
const productRouter = require("../routes/product.routes");

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 8080;
    this.userPath = "/api/users";
    this.productPath = "/api/products";

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
    this.app.use(this.userPath, userRouter);
    this.app.use(this.productPath, productRouter);
  }

  start() {
    this.app.listen(this.PORT, () =>
      console.log("Running on port " + this.PORT)
    );
  }
}

module.exports = Server;
