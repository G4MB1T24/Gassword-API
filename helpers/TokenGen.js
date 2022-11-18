const jwt = require("jsonwebtoken")
const jwt_sec = process.env.JWT_SEC

const TokenGen = (id) => {
    return jwt.sign({ id }, jwt_sec, {
        expiresIn : "30d"
    })
}
module.exports = TokenGen;