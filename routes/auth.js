const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const getAuth = require("../middleware/getAuth");
const TokenGen = require("../helpers/TokenGen");

router.post(
  "/createuser",
  [
    body("email").isEmail().withMessage("Email Required"),
    body("mpin").isLength({ min: 4, max: 4 }).withMessage("Mpin is required"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Min 5 characters Required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, mpin } = req.body;
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

      const User = await Users.create({
        email: email,
        password: securePass,
        mpin: secureMpin,
      });

      res.json({
        User: User,
        token: TokenGen(User._id),
      });
    } catch (error) {
      res.json({ e: error.message });
    }
  }
);
// Login
router.post(
  "/login",
  [
    body("email", "not an email").isEmail(),
    body("password").exists().withMessage("Min 5 characters Required"),
    body("mpin").isLength({ min: 4, max: 4 }).withMessage("Mpin is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, mpin } = req.body;
    try {
      let user = await Users.findOne({ email });
      // console.log(user)
      if (!user) {
        return res
          .status(400)
          .json({ error: "Login with correct Credentials " });
      }
      const mpincompare = await bcrypt.compare(mpin, user.mpin);
      if (!mpincompare) return res.status(404).send("Incorrect Mpin");
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Login with correct Credentials " });
      }

      res.json({ user: user, token: TokenGen(user._id) });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ Error: "server error" });
    }
  }
);
router.post("/getuser", getAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Users.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
