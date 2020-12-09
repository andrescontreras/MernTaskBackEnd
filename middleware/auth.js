const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    console.log(token);

    if (!token) {
        return res.status(401).json({ msg: "send the token" })
    }

    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = tokenData.user;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "invalid token" })
    }

}