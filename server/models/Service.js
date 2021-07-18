const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  service_name: String,
  picture: String,
  service_type: String,
  br_number: String,
//   quantity: Number,
   Description: String,
  
});

module.exports = mongoose.model("Service", serviceSchema);