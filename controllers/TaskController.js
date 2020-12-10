const Task = require('../models/Task');
const Project = require('../models/Project');
const bcryptjs = require('bcryptjs');
const { validationResult, check } = require('express-validator');
const jwt = require('jsonwebtoken');

function checkValidationResult(req, res) {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() })
    }
}

exports.createTask = async (req, res) => {

    checkValidationResult(req, res);

    const { project } = req.body;


    try {
        const checkProject = await Project.findById(project);
        console.log("**", checkProject);
        if (!checkProject) {
            return res.status(404).json({ msg: 'Project not found' })
        }

        if (checkProject.owner.toString() !== req.user.id) {
            return res.status(404).json({ msg: "User invalid" })
        }

        const task = new Task(req.body);
        await task.save();
        res.json(checkProject);

    } catch (err) {
        console.error(err);
        res.status(500).send('BackEnd Error');
    }
}

exports.getTasksByProject = async (req, res) => {

    const { project } = req.body;
    try {

        const checkProject = await Project.findById(project);
        console.log("**", checkProject);
        if (!checkProject) {
            return res.status(404).json({ msg: 'Project not found' })
        }

        if (checkProject.owner.toString() !== req.user.id) {
            return res.status(404).json({ msg: "User invalid" })
        }

        const tasks = await Task.find({ project })
        res.json({ tasks });

    } catch (err) {
        console.log(err);
        res.status(500).send('BackEnd Error');
    }
}

exports.updateTask = async (req, res) => {
    checkValidationResult(req, res);
    const { name, state, project } = req.body;
    const newTask = {};

    if (name) {
        newTask.name = name;
    }

    if (state) {
        newTask.state = state;
    }

    try {

        const checkProject = await Project.findById(project);
        const task = await Task.findById(req.params.id);
        console.log("**", checkProject);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' })
        }

        if (checkProject.owner.toString() !== req.user.id) {
            return res.status(404).json({ msg: "User invalid" })
        }

        const taskUpdated = await Task.findOneAndUpdate({ _id: req.params.id }, { $set: newTask }, { new: true });

        res.json({ taskUpdated });

    } catch (err) {
        console.error(err);
        res.status(500).send('BackEnd Error');
    }

}

exports.deleteTask = async (req, res) => {

    const { project } = req.body;

    try {
        let task = await Task.findById(req.params.id);
        const checkProject = await Project.findById(project);
        if (!task) {
            return res.status(404).json({ msg: "task not found" })
        }

        if (checkProject.owner.toString() !== req.user.id) {
            return res.status(404).json({ msg: "the user cannot delete the task" })
        }

        task = await Task.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: "project deleted" });

        res.json({ task });

    } catch (err) {
        console.error(err);
        res.status(500).send('BackEnd Error');
    }
}