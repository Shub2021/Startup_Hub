const mongoose = require("mongoose");

const AdminComplaintSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  br_number: String,
  description: String,
  status: String,
  type: String,
  complian_Category: String,
  placed_date: String,
});

module.exports = mongoose.model("AdminComplaint", AdminComplaintSchema);