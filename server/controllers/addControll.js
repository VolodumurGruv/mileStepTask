const Task = require("../schemas/taskSchema");

module.exports.taskAdd = async (req, res) => {
  if (req.body) {
    const task = new Task(req.body);

    try {
      await task.save();

      console.log("task was saved");

      res
        .status(200)
        .send({ status: "Ok", message: "it is saved successfully" });
    } catch (e) {
      console.error(e.message);
    }
  } else {
    console.error(`Some error in adding new task ${e}`);

    res.status(e.status).send({ error: e });
  }
};

module.exports.taskGet = async (req, res) => {
  try {
    const allTasks = await Task.find({});

    res.json(allTasks);
  } catch (e) {
    console.error(`Some error in adding new task ${e}`);

    res.status(e.status).send({ error: e });
  }
};

module.exports.taskEdit = async (req, res) => {
  try {
    const { id } = req.body;

    const task = await Task.findByIdAndUpdate(id, req.body);

    res.status(200).send({ status: "Ok", message: "was edited" });
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

    const task = await Task.find({});

    res.status(200).send({ status: "Ok", message: "was deleted", task });
  } catch (e) {
    console.error(`Some error in adding new task ${e}`);

    res.status(e.status).send({ error: e });
  }
};
