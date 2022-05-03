const Task = require("../schemas/taskSchema");

module.exports.taskAdd = async (req, res) => {
  if (req.body) {
    const task = new Task(req.body);

    try {
      await task.save();

      console.log("task was saved");

      res.status(200).send({ status: "Ok" });
    } catch (e) {
      console.error(`Some error in adding new task ${e}`);

      res.status(e.status).send({ error: e });
    }
  } else {
    throw new Error("Data don't recived");
  }

  // res.status(200).send({ status: "Ok" });
};

module.exports.home = (req, res) => {
  res.send("it works");
};

module.exports.taskGet = async (req, res) => {
  const allTasks = await Task.find({});

  res.json(allTasks);
};
