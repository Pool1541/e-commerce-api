const express = require("express");
const cors = require("cors");
const dbConnection = require("../database/config");
const cookieParser = require("cookie-parser");
const userRouter = require("../routes/user.routes");
const productRouter = require("../routes/product.routes");
const categoryRouter = require("../routes/category.routes");
const authRouter = require("../routes/auth.routes");
const adminRouter = require("../routes/admin.routes");
const filterRuter = require("../routes/filter.routes");

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 8080;
    this.userPath = "/api/users";
    this.productPath = "/api/products";
    this.categoryPath = "/api/category";
    this.authPath = "/api/auth";
    this.adminPath = "/api/admin";
    this.filterPath = "/api/filters";
    this.origin =
      process.env.NODE_ENV === "production"
        ? "https://pool1541.github.io/e-commerce"
        : "http://127.0.0.1:5173";

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
    this.app.use(express.static("public"));
  }

  async connectDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.authPath, authRouter);
    this.app.use(this.adminPath, adminRouter);
    this.app.use(this.userPath, userRouter);
    this.app.use(this.productPath, productRouter);
    this.app.use(this.categoryPath, categoryRouter);
    this.app.use(this.filterPath, filterRuter);
  }

  start() {
    this.app.listen(this.PORT, () =>
      console.log("Running on port " + this.PORT)
    );
  }
}

module.exports = Server;
