const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const verifyToken = require("../verify");
const secretKey = process.env.SECRET_KEY;
const fs = require("fs");

const router = express.Router();

//GET events by user
router.get("/", verifyToken, async (req, res) => {
  try {
    const token = req.headers.authorization.split('"').join("");
    const user = jwt.verify(token, secretKey);
    const userWithEvents = (await User.find({ username: user.username }))[0];

    res.json(userWithEvents.events);
  } catch (error) {
    res.json({ message: error });
  }
});

//Update events
router.patch("/", verifyToken, async (req, res) => {
  try {
    const token = req.headers.authorization.split('"').join("");
    const user = jwt.verify(token, secretKey);
    const newEvents = await User.findOneAndUpdate(
      { username: user.username },
      { events: req.body.events }
    );
    const userWithEvents = (await User.find({ username: user.username }))[0];

    res.json(userWithEvents.events);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
