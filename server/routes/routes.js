const router = require("express").Router();
const add = require("../controllers/addControll");

router.route("/add").get(add.task).post(add.task);

module.exports = router;
