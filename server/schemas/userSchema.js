const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  confirmedAt: Date,
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

module.exports = model("User", UserSchema);
