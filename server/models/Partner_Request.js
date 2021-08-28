const mongoose = require("mongoose");

const PRequestSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  from: String,
  to: String,
  status: String,
});

module.exports = mongoose.model("Partner_Request", PRequestSchema);
