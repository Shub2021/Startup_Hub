const mongoose = require("mongoose");

const AnnualFeeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  br_number: String,
  paymentDate: String,
  amount: String,
  year: String,
});

module.exports = mongoose.model("AnnualFee", AnnualFeeSchema);
