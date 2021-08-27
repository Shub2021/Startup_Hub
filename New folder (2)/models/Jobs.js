const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
    task : String,
    status : String,
  });

const JobsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: String,
  description: String,
  serviceid: String,
  clientid: String,
  taskarray: [ToDoSchema],
});

module.exports = mongoose.model("Jobs", JobsSchema);
