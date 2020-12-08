const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() })
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            console.error("Incorrect email", email)
            return res.status(400).json({ msg: 'Login error' })
        }

        const passValidation = await bcryptjs.compare(password, user.password);
        if (!passValidation) {
            console.error("Incorrect password", password)
            return res.status(400).json({ msg: 'Login error' })
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: 3600
        }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        });

    } catch (err) {
        console.error(err);
    }

}