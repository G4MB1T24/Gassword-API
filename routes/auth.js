const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const Users = require("../models/Users");
const getAuth = require("../middleware/getAuth");
const TokenGen = require("../helpers/TokenGen");
let success = false

router.post(
  "/createuser",
  [
    body("email").isEmail().withMessage("Email Required"),
    body("mpin").isLength({ min: 4, max: 4 }).withMessage("Mpin is required"),
    body("enc_key").isLength({ min: 4 }).withMessage("Secret is required"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Min 5 characters Required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, mpin , enc_key} = req.body;
    try {
      let useremail = await Users.findOne({ email: req.body.email });
      if (useremail) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      const salt = await bcrypt.genSaltSync(10);
      const securePass = await bcrypt.hash(password, salt);
      const secureMpin = await bcrypt.hash(mpin, salt);
      const secureenc_key = await bcrypt.hash(enc_key , salt)
      const User = await Users.create({
        email: email,
        password: securePass,
        mpin: secureMpin,
        enc_key : secureenc_key
      });
      success = true
      res.json({
        success,
        token: TokenGen(User._id , email),
      });
    } catch (error) {
      res.send("Some Error has occured make sure to input right info").status(404)
      
    }
  }
);

router.post(
  "/login",
  [
    body("enc_key").isLength({ min: 4 }).withMessage("Secret is required"),
    body("email", "not an email").isEmail(),
    body("password").isLength({min: 5}).exists().withMessage("Min 5 characters Required"),
    body("mpin").isLength({ min: 4, max: 4 }).withMessage("Mpin is required"),

  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, mpin , enc_key } = req.body;
    try {
      let user = await Users.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success , error: "Login with correct Credentials " });
      }
      const mpincompare = await bcrypt.compare(mpin, user.mpin);
      if (!mpincompare) return res.status(404).send("Incorrect Mpin");
      const encCompare = await bcrypt.compare(enc_key, user.enc_key)


      if (!encCompare)  return res.status(404).send("Incorrect cred")
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
        
        
          .status(400)
          .json({success :false, error: "Login with correct Credentials " });
      }
      success = true
      res.json({ success , token: TokenGen(user._id , email) });
    } catch (error) {
      
      res.send("Some Error has occured make sure to input right info").status(404)
      
    }
  }
);


module.exports = router;
