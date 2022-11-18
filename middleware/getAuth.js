const jwt = require("jsonwebtoken")
require("dotenv").config();

const jwt_sec = process.env.JWT_SEC

const getAuth = (req, res, next) => {
    const token = req.header("auth-token")
    if (!token) {
        res.send("Access denied").status(401)
    }
    try {
        
        const data = jwt.verify(token, jwt_sec)
        req.user = data;
        next()
    } catch (error) {
        res.send("Access denied").status(401)
        
    }
}


module.exports = getAuth