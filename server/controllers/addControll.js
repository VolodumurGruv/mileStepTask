const Task = require("../schemas/taskSchema");

module.exports.taskAdd = async (req, res) => {
  if (req.body) {
    const task = new Task(req.body);

    try {
      await task.save();

      console.log("task was saved");

      res.status(200).send({ status: "Ok" });
    } catch (e) {}
  } else {
    throw new Error("Data don't recived");
  }
};

module.exports.taskGet = async (req, res) => {
  const allTasks = await Task.find({});

  res.json(allTasks);
};

module.exports.taskEdit = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id, req.body);
    const task = await Task.findByIdAndUpdate(id, req.body);
    console.log(task);
  } catch (e) {
    console.error(`Some error in adding new task ${e}`);

    res.status(e.status).send({ error: e });
  }
};

module.exports.taskDelete = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    await Task.findByIdAndDelete(id);

    res.status(200).send({ status: "Ok" });
  } catch (e) {
    console.error(`Some error in adding new task ${e}`);

    res.status(e.status).send({ error: e });
  }
};
