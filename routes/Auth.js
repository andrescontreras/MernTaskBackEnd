const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

const { check } = require('express-validator');

router.post('/',
    [
        check('email', 'add a valid email').isEmail(),
        check('password', 'password at least 6 characteres').isLength({ min: 6 })
    ],
    AuthController.authenticateUser
);

module.exports = router;