const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const getAuth = require("../middleware/getAuth");
const Gassword = require("../models/Gassword");
const Users = require("../models/Users");
const encrypt = require("../helpers/Encryptor");

require("dotenv").config();

let success = false

router.post(
  "/getgass",

  getAuth,
  async (req, res) => {
    try {
      if (!req.body.mpin) return res.send("Mpin Required").status(404);
      const user = await Users.findOne({ user: req.user.id });
      const mpincompare = await bcrypt.compare(req.body.mpin, user.mpin);
      if (!mpincompare) return res.status(404).send("Incorect Mpin");
      const gass = await Gassword.find({ user: req.user.id });
      res.json(gass);
    } catch (error) {
      res.send("Some Error has occured make sure to input right credentials. if you forgot your enc_key there is no way to recover it.").status(404)
    }
  }
);

router.post(
  "/creategass",
  [
    body("title").isLength({ min: 3 }).withMessage("title Required"),
    body("mail").isLength({ min: 3 }).withMessage("title Required"),
    body("enc_key").isLength({ min: 4 }).withMessage("Secret is required"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Min 5 characters Required"),
  ],
  getAuth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, password , enc_key ,  mail } = req.body;
    try {
      const user = await Users.findOne({ user: req.user.id });
      const processedKey = await bcrypt.compare(enc_key, user.enc_key)
      if (!processedKey) return res.status(404).send("Incorect Encryption Key!");
      
      const gass = await Gassword.create({
        mail: mail,
        title: title,
        password: encrypt(password ,enc_key),
        user: req.user.id,
      });
      success  = true  

      res.json({ success, gass });
    } catch (error) {
      res.send("Some Error has occured make sure to input right credentials. if you forgot your enc_key there is no way to recover it.").status(404)
  
    }
  }
);

router.delete("/delete/:id", getAuth, async (req, res) => {
  try {
    if (!req.body.mpin) return res.send("Mpin Required").status(404);
    const user = await Users.findOne({ user: req.user.id });

    if (!req.params.id) return res.send("Please input userid");
    const mpincompare = await bcrypt.compare(req.body.mpin, user.mpin);
    
    if (!mpincompare) return res.status(404).send("Incorect Mpin");
    const gass = await Gassword.findByIdAndDelete(req.params.id);
    
    if (!gass) return res.send("Post not found");
    res.send("Deleted!");
  } catch (error) {
    res.send("Some Error has occured make sure to input right credentials. if you forgot your enc_key there is no way to recover it.").status(404)

  }
});
module.exports = router;
