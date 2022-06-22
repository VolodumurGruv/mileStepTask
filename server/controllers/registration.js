const User = require("../schemas/userSchema");

module.exports.signup = async (req, res) => {
  console.log(req.body);
  res.status(200).send({ message: "signed up successfully" });
};
