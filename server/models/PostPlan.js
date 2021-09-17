const mongoose = require("mongoose");

const ViewPost_PlanSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  amount: Number,
  email: String,
  payBackPeriod: String,
  interestRate: Number,
  information: String,
  startDate: String,
  br_number: String,
});

module.exports = mongoose.model("PostPlan", ViewPost_PlanSchema);
