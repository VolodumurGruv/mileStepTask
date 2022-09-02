const User = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
  const { userName, email, password, confirmedAt } = { ...req.body };

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      throw err;
    }

    const user = new User({
      userName,
      email,
      password: hash,
      confirmedAt,
    });

    await user.save();
  });

  res.status(200).send({ message: "signed up successfully" });
};

module.exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).send({ message: "Authentication failed" });
  }
  const isPass = await bcrypt.compare(req.body.password, user.password);

  if (!isPass) {
    return res.status(401).send({ message: "Authentication failed" });
  }

  const jwtToken = await jwt.sign(
    {
      email: user.email,
      userId: user._id,
    },
    "some secret key",
    { expiresIn: "1h" }
  );

  res.status(200).send({
    message: "logged in",
    token: jwtToken,
    expiresIn: 3600,
    _id: user._id,
  });
};
