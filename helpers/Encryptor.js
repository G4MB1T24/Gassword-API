require("dotenv").config();

const CryptoJS = require("crypto-js");
const SECRET_KEY = process.env.ENC_SECRET_KEY;

const encrypt = (password) => {
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};
module.exports = encrypt;
