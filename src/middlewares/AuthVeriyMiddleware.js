const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['token'];
    jwt.verify(token, "SecretKey123456", (err, decoded) => {
        if(err) {
            res.status(401).json({status: "Unauthorized"});
        } else {
            req.headers.email = decoded.email;
            next();
        }
    })
}