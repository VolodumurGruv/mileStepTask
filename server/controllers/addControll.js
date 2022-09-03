const Task = require("../schemas/taskSchema");
const User = require("../schemas/userSchema");
const { Types } = require("mongoose");

module.exports.taskAdd = async (req, res) => {
  const { userID } = req.query;
  const user = await User.findById(userID);

  if (req.body) {
    const task = new Task(req.body);

    task._id = new Types.ObjectId();
    user.tasks.push(task._id);

    await task.save();
    await user.save();

    res.status(200).send({ status: "Ok", message: "Task successfully added" });
  } else {
    console.error(`Some error in adding new task ${e}`);

    res.status(e.status).send({ error: e });
  }
};

module.exports.taskGet = async (req, res) => {
  const { userID } = req.query;
  const user = await User.findById(userID).populate("tasks");

  if (user.tasks.length) {
    const tasks = user.tasks;

    res.json(tasks);
  } else {
    res.send({ error: "No any task" });
  }
};

module.exports.taskEdit = async (req, res) => {
  if ("title" in req.body) {
    const { id } = req.body;

    await Task.findByIdAndUpdate(id, req.body);

    res.status(200).send({ status: "Ok", message: "Task successfully edited" });
  } else {
    res.send({ error: "Task wasn't eddited. An error ocures " });
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
