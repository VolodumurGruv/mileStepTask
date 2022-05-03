const router = require("express").Router();
const add = require("../controllers/addControll");

router.route("/add").post(add.taskAdd);
router.route("/").get(add.taskGet);

module.exports = router;
