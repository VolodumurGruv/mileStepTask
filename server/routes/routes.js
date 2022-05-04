const router = require("express").Router();
const add = require("../controllers/addControll");

router.route("/").get(add.taskGet);
router.route("/add").post(add.taskAdd);
router.route("/edit").post(add.taskEdit);
router.route("/delete").post(add.taskDelete);

module.exports = router;
