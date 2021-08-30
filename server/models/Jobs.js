const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  id: Number,
  task: String,
  completed: Boolean,
});

const JobsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: String,
  description: String,
  serviceid: String,
  clientid: String,
  br_number: String,
  job_status: String,
  taskarray: [ToDoSchema],
});

module.exports = mongoose.model("Jobs", JobsSchema);
