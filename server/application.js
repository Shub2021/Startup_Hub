const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const application = express();
require("./models/Startup_Company");
require("./models/Startup_User");
const userRoutes = require("./routes/user");
const companyRoutes = require("./routes/company");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const serviceRoutes = require("./routes/service");
const prequestRoutes = require("./routes/prequest");
const investorRoutes = require("./routes/investor");
const investor_requestRoutes = require("./routes/investor_request");
const startup_requestRoutes = require("./routes/startup_request");
const subscribetRoutes = require("./routes/subscribe");
const planRoutes = require("./routes/plan");
const mailRoutes = require("./routes/mailer");
const jobRoutes = require("./routes/jobs");
const clientRoutes = require("./routes/client");
const paymentRoutes = require("./routes/payment");
const annfeeRoutes = require("./routes/annualfee");
const complaintRoutes = require("./routes/complaints");
const admincomplaintRoutes = require("./routes/admin_complain");
const postplanRoutes = require("./routes/postplan");
const adminRoutes = require("./routes/admin");

application.use(bodyParser.json());
application.use(cors());

const Startup_Company = mongoose.model("Startup_Company");
const Startup_User = mongoose.model("Startup_User");
const Product = mongoose.model("Product");
const Order = mongoose.model("Order");
const Service = mongoose.model("Service");

const mongoUri =
  "mongodb+srv://startupuser:AknzsBEIJHUfyULI@cluster0.qb28g.mongodb.net/userdb?retryWrites=true&w=majority";

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
application.use("/prequest", prequestRoutes);
application.use("/investor", investorRoutes);
application.use("/investorrequest", investor_requestRoutes);
application.use("/startuprequest", startup_requestRoutes);
application.use("/subscribe", subscribetRoutes);
application.use("/plan", planRoutes);
application.use("/Jobs", jobRoutes);
application.use("/mail", mailRoutes);
application.use("/client", clientRoutes);
application.use("/payment", paymentRoutes);
application.use("/annualfee", annfeeRoutes);
application.use("/complaint", complaintRoutes);
application.use("/admincomplaint", admincomplaintRoutes);
application.use("/postplan", postplanRoutes);
application.use("/admin", adminRoutes);

application.listen(3000, () => {
  console.log("server runnig");
});

mongoose.disconnect;
