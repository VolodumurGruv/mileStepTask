const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  confirmedAt: Date,
});

module.exports = model("User", UserSchema);
