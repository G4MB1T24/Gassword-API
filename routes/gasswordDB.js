const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const getAuth = require("../middleware/getAuth");
const Gassword = require("../models/Gassword");
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const encrypt = require("../helpers/Encryptor");
require("dotenv").config();
router.get(
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
      res.send("Error boop");
    }
  }
);
router.post(
  "/creategass",
  [
    body("title").isLength({ min: 3 }).withMessage("title Required"),
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
    const { title, password } = req.body;
    try {
      const gass = await Gassword.create({
        title: title,
        password: encrypt(password),
        user: req.user.id,
      });

      res.send(gass);
    } catch (error) {
      res.json({ error: error.message });
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
  } catch (error) {}
});
module.exports = router;
