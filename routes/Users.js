const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { check } = require('express-validator');

router.post('/',
    [
        check('name', 'name is required').not().isEmpty(),
        check('email', 'add a valid email').isEmail(),
        check('password', 'password at least 6 characteres').isLength({ min: 6 })
    ],
    UserController.createUser);

module.exports = router;