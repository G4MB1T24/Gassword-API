require("dotenv").config();

const CryptoJS = require("crypto-js");
// const SECRET_KEY = process.env.ENC_SECRET_KEY;

const encrypt = (password, enc_key) => {
  console.log(CryptoJS.AES.encrypt(password, enc_key).toString())
  return CryptoJS.AES.encrypt(password, enc_key).toString();
  
};
module.exports = encrypt;
