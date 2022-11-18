const jwt = require("jsonwebtoken")
require("dotenv").config();

const jwt_sec = process.env.JWT_SEC

const TokenGen = (id) => {
    return jwt.sign({ id }, jwt_sec, {
        expiresIn : "30d"
    })
}
module.exports = TokenGen;