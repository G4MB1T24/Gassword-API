const jwt = require("jsonwebtoken")
require("dotenv").config();

const jwt_sec = process.env.JWT_SEC

const TokenGen = (id , email) => {
    return  jwt.sign({ id , email }, jwt_sec, {
        expiresIn : "30d"
    })
}
module.exports = TokenGen;