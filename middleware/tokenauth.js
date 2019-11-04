const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    // check if token exists 
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(400).json({msg: "no token provided, authentication failed"});
    }

    // verify token, extract payload 
    try {
        const payload = jwt.verify(token, config.get("jwtKey"));
        req.user = payload.user; 
        next(); 
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "server error"});
    }
}