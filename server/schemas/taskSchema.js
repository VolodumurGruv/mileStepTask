const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
  title: String,
  description: String,
  priority: Number,
  isDone: Boolean,
  dueDate: Date,
});

module.exports = model("Task", TaskSchema);
