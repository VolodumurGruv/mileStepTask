const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  priority: Number,
  isDone: Boolean,
  dueDate: Date,
});

module.exports = model("Task", TaskSchema);
