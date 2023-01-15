const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const { Createusermodel } = require("../model/user.model");

const userrouter = express.Router();

userrouter.post("/signup", async (req, res) => {
  const { name, age, password, email } = req.body;

  const user = await Createusermodel.find({ email });
  // console.log(user)
  if (user.length > 0) {
    res.send("already registerd this email please login");
  } else {
    try {
      bcrypt.hash(password, 5, async(err, hash) => {
        // Store hash in your password DB.
        if(err){
            console.log(err)
          
        }
        else{
          const new_user = new Createusermodel({
            name,
            age,
            email,
            password: hash,
          });
         await new_user.save();
          res.send("rigesterd");
        }
       
      });
    } catch (error) {
      console.log(error);
      res.send("cannot register the user");
    }
  }
});

userrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(email)
  try {
    const user = await Createusermodel.find({ email });
    // console.log(user)
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token=jwt.sign({userID:user[0]._id}, 'masai')
          res.send({ "message": "login sucessfull","token":token });
        } else {
          res.send("wrong Credentials");
        }
      });
    } else {
      res.send("cannot login");
    }
  } catch (error) {
    res.send(error);
  }
});
module.exports = {
  userrouter,
};
