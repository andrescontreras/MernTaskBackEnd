const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() })
    }

    const { email, password } = req.body;

    try {


        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "the email already exists" })
        }


        user = new User(req.body);
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        await user.save();

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
        console.log(err);
        res.status(400).send(err);
    }

}