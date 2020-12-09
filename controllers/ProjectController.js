const Project = require('../models/Project');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createProject = async (req, res) => {

    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() })
    }

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