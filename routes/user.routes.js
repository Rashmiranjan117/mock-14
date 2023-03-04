const { UserModel } = require("../model/user.model");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    let data = await UserModel.find();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

userRouter.post("/register", async (req, res) => {
  let { email, password } = req.body;
  try {
    bcrypt.hash(password, 6, async (err, secured_password) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({
          email,
          password: secured_password,
        });
        await user.save();
        res.send({ msg: "registered" });
      }
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  const user = await UserModel.find({ email });

  if (user.length > 0) {
    bcrypt.compare(password, user[0].password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { email, password, userID: user[0]._id },
          "masai"
        );
        res.send({ msg: "Login Successfull", token });
      } else {
        res.send("Wrong Credentials", err);
      }
    });
  } else {
    res.send("User not found");
  }
  try {
  } catch (err) {
    res.send("Login err");
  }
});

module.exports = { userRouter };
