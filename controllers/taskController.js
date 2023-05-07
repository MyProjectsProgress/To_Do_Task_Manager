const asyncWrapper = require('../middlewares/async');
const Task = require('../models/taskModel');

exports.getAllTasks = asyncWrapper(async (req, res, next) => {

    const tasks = await Task.find({});
    res.status(200).json({ results: tasks.length, tasks });
});

exports.createTask = asyncWrapper(async (req, res, next) => {

    const task = await Task.create(req.body);
    res.status(201).json({ task });
});

exports.getTask = asyncWrapper(async (req, res, next) => {

    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
        const error = new Error('Not Found!');
        error.status = 404;
        return res.status(404).json({ message: `No Task With ID: ${id}` });
    }

    res.status(200).json({ task });
});

exports.updateTask = asyncWrapper(async (req, res, next) => {

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(201).json({ task });
});

exports.deleteTask = asyncWrapper(async (req, res, next) => {

    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
        return res.status(404).json({ message: `No Task With ID: ${id}` });
    }

    res.status(200).json({ task });
    // res.status(200).json({ task: null, status: 'success' });
});

exports.editTask = asyncWrapper(async (req, res, next) => {

    // It will overwrite tha old body with the new body parameters
    // patch updates the properties we passed in but put updates the whol body
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, overwrite: true });
    res.status(201).json({ task });
});
