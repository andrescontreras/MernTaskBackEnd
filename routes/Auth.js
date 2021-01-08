const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

const { check } = require('express-validator');
const auth = require('../middleware/auth');

// login
router.post(
  '/',
  [
    check('email', 'add a valid email').isEmail(),
    check('password', 'password at least 6 characteres').isLength({ min: 6 }),
  ],
  AuthController.authenticateUser
);

//
router.get('/', auth, AuthController.authenticatedUser);

module.exports = router;
