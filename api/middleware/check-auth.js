const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader == "undefined") {
        return res.status(403).json({
            message: "Authentication Failed by token",
            status: res.statusCode
        });
    }
    const token = bearerHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
        if (err) {
            return res.status(403).json({
                message: "Authentication Failed by token",
                status: res.statusCode
            })
        };
        req.userId = authData._id;
        next();
    });
}
module.exports = { checkAuth };
