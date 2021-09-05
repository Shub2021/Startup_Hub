const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  cName: String,
  investArea: String,
  cAddress: String,
  nic: Number,
  cTel: Number,
  email: String,
});

module.exports = mongoose.model("user", ClientSchema);
