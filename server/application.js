const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const application = express();
require("./models/Startup_Company");
require("./models/Startup_User");
const userRoutes = require("./routes/user");
const companyRoutes = require("./routes/company");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const serviceRoutes = require("./routes/service");

application.use(bodyParser.json());

const Startup_Company = mongoose.model("Startup_Company");
const Startup_User = mongoose.model("Startup_User");
const Product = mongoose.model("Product");
const Order = mongoose.model("Order");
const Service = mongoose.model("Service");

const mongoUri =
  "mongodb+srv://startupuser:AknzsBEIJHUfyULI@cluster0.qb28g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "userdb",
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});

mongoose.connection.on("error", (err) => {
  console.log("error", err);
});
mongoose.Promise = global.Promise;
application.use("/users", userRoutes);
application.use("/company", companyRoutes);
application.use("/product", productRoutes);
application.use("/order", orderRoutes);
application.use("/service", serviceRoutes);

application.listen(3000, () => {
  console.log("server runnig");
});

mongoose.disconnect;
