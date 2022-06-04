const taskSchema = require("../schemas/taskSchema");
const ExpressError = require("./ExpressError");

module.exports.validateSchema = (req, res, next) => {
  const { error } = taskSchema.validate(req.body);

  if (error) {
    const text = error.details.map((el) => el.message).join(",");
    throw new ExpressError(text, 400);
  } else {
    next();
  }
};
