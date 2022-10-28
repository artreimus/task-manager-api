const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
    // res.status(200).json({ tasks, amount: tasks.length });
    // res.status(200).json({
    //   status: 'success',
    //   data: {
    //     tasks,
    //     nbHits: tasks.length,
    //   },
    // });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// get single task using findById
// const getTask = async (req, res) => {
//   const { id: taskID } = req.params;
//   try {
//     const task = await Task.findById(taskID);
//     res.status(200).json({ task });
//   } catch (error) {
//     return res.status(404).json({ msg: `No task with id ${taskID}` });
//   }
// };

// get single task using findOne
const getTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const task = await Task.findOne({ _id: taskID });
    res.status(200).json({ task });

    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  const { id: taskID } = req.params;

  try {
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    }); // without options (3rd param), we are getting the old value
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  const { id: taskID } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const editTask = async (req, res) => {
  const { id: taskID } = req.params;

  try {
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    }); // without options (3rd param), we are getting the old value
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
};
