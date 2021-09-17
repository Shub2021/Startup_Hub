const mongoose = require("mongoose");

const Startup_CompanySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  company_name: String,
  email: String,
  contact: String,
  type: String,
  category: String,
  address: String,
  br_number: String,
  admin: String,
  password: String,
  image: String,
  last_payment: String,
  payment_month: Number,
  account_status: String,
  location: { lat: String, long: String },
  partners: [],
});

module.exports = mongoose.model("Startup_Company", Startup_CompanySchema);
