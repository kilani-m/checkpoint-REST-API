const express = require("express");
const User = require("../models/User");

const router = express.Router();

//all users
router.get("/", async function (req, res) {
  try {
    const allUsers = await User.find();
    res.send({ allUsers });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//add user
router.post("/add", async function (req, res) {
  try {
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
      res.status(400).send({ msg: "User exist" });
    } else {
      const newUser = new User({
        ...req.body,
      });
      await newUser.save();
      res.send({ msg: "User added" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//edit user by id
router.put("/:id", async (req, res) => {
  try {
    const userEdited = await User.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    const newUser = await User.find({ _id: req.params.id });
    if (userEdited.modifiedCount) {
      return res.send({ msg: "user updated", newUser });
    }
    res.status(400).send("user already updated");
  } catch (error) {
    
    res.status(400).send(error.message);
  }
});

//remove
router.delete("/:id", async (req, res) => {
  try {
    const userDelete = await User.deleteOne({ _id: req.params.id });
    if (userDelete.deletedCount) {
      return res.send({ msg: "User deleted" });
    }
    res.status(400).send("user already removed");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
