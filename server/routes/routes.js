const router = require("express").Router();
const add = require("../controllers/addControll");
const signFllow = require("../controllers/registration");
const catchAsync = require("../utils/catchAsync");
const { validateSchema } = require("../utils/middleware");

router.route("/").get(catchAsync(add.taskGet));
router.route("/add").post(validateSchema, catchAsync(add.taskAdd));
router.route("/edit").post(validateSchema, catchAsync(add.taskEdit));
router.route("/delete").post(catchAsync(add.taskDelete));
router.route("/signup").post(catchAsync(signFllow.signup));
router.route("/login").post(catchAsync(signFllow.login));

module.exports = router;
