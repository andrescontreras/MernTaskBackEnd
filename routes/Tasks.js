const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/TaskController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
    auth,
    [
        check('name', 'name is required').not().isEmpty(),
        check('project', 'project is required').not().isEmpty(),
    ],
    ProjectController.createTask);

router.get('/',
    auth,
    ProjectController.getTasksByProject);

router.put('/:id',
    auth,
    [
        check('project', 'project is required').not().isEmpty(),
    ],
    ProjectController.updateTask);

router.delete('/:id',
    auth,
    [
        check('project', 'project is required').not().isEmpty(),
    ],
    ProjectController.deleteTask);

module.exports = router;