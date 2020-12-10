const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/ProjectController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
    auth,
    [
        check('name', 'name is required').not().isEmpty(),
    ],
    ProjectController.createProject);

router.get('/',
    auth,
    ProjectController.getProjects);

router.put('/:id',
    auth,
    [
        check('name', 'name is required').not().isEmpty(),
    ],
    ProjectController.updateProject);

router.delete('/:id',
    auth,
    ProjectController.deleteProject);

module.exports = router;