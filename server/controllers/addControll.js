const Task = require("../schemas/taskSchema");

module.exports.taskAdd = async (req, res) => {
  if (req.body) {
    const task = new Task(req.body);

    await task.save();

    res.status(200).send({ status: "Ok", message: "Task successfully added" });
  } else {
    console.error(`Some error in adding new task ${e}`);

    res.status(e.status).send({ error: e });
  }
};

module.exports.taskGet = async (req, res) => {
  const allTasks = await Task.find({});

  res.json(allTasks);
};

module.exports.taskEdit = async (req, res) => {
  if (req.body) {
    const { id } = req.body;

    await Task.findByIdAndUpdate(id, req.body);

    res.status(200).send({ status: "Ok", message: "Task successfully edited" });
  } else {
    console.error(`Some error in editing task ${e}`);

    res.status(e.status).send({ error: e });
  }
};

module.exports.taskDelete = async (req, res) => {
  if (req.body) {
    const { id } = req.body;

    await Task.findByIdAndDelete(id);

    res
      .status(200)
      .send({ status: "Ok", message: "Task successfully deleted" });
  } else {
    console.error(`Some error in deleting task ${e}`);

    res.status(e.status).send({ error: e });
  }
};
