const express = require("express");
const getAuth = require("../middleware/getAuth");
const router = express.Router();
const Users = require("../models/Users");

router.post("/getuser", getAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Users.findById(userId).select(
      "-password",
      "-mpin",
      "enc_key"
    );

    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
