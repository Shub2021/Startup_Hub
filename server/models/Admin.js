const mongoose = require("mongoose");

const Admin_UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  password: String,
});

module.exports = mongoose.model("Admin", Admin_UserSchema);
