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

exports.createProject = async (req, res) => {

    checkValidationResult(req, res);

    try {
        const project = new Project(req.body);
        project.owner = req.user.id;
        await project.save();
        res.json(project);

    } catch (err) {
        console.error(err);
        res.status(500).send('BackEnd Error');
    }
}

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user.id });
        res.json({ projects });
    } catch (err) {
        console.log(err);
        res.status(500).send('BackEnd Error');
    }
}

exports.updateProject = async (req, res) => {
    checkValidationResult(req, res);
    const { name } = req.body;
    const newProject = {};

    if (name) {
        newProject.name = name;
    }

    try {
        console.log(req.params.id);
        let project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ msg: "project not found" })
        }

        if (project.owner.toString() !== req.user.id) {
            return res.status(404).json({ msg: "the user cannot update the project" })
        }

        project = await Project.findOneAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });

        res.json({ project });

    } catch (err) {
        console.error(err);
        res.status(500).send('BackEnd Error');
    }

}

exports.deleteProject = async (req, res) => {

    try {
        console.log(req.params.id);
        let project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ msg: "project not found" })
        }

        if (project.owner.toString() !== req.user.id) {
            return res.status(404).json({ msg: "the user cannot delete the project" })
        }

        project = await Project.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: "project deleted" });

        res.json({ project });

    } catch (err) {
        console.error(err);
        res.status(500).send('BackEnd Error');
    }
}