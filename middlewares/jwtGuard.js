const jwt = require('jsonwebtoken');

const jwtGuard = (req, res, next) => {
    const token = req.header('x-access-token');
    if (!token) res.status(401).json({
        msg: "no token"
    });
    const { userId, role } = jwt.verify(token, process.env.JWT_KEY);
    if (userId && role) {
        req.user = { id: userId, role };
        next();
    }
    else {
        return res.status(401).json({
            msg: "Unauthorized"
        })
    }
}


module.exports = jwtGuard;