const { Router } = require("express");
const router = Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

const salt = 10;

// Retrieve Login Page
router.get("/login", (req, res) => {});

// Retrieve Login Request
router.post("/login", (req, res) => {});

// Retrieve Signup Page
router.get("/signup", (req, res) => {
  console.log("SIGNUP REQ");
  res.render("signup");
});

// Retrieve Login Request
router.post("/signup", (req, res) => {
  console.log(req.body);
  const { username, email, password, location } = req.body;

  if (
    email.length < 4 ||
    !email.includes("@") ||
    username.length < 5 ||
    password.length < 8 ||
    !location
  ) {
    // send error to frontend
  }

  /* 
  Password strength validator
  */

  User.findOne({ $or: [{ username }, { email }] }).then((foundUser) => {
    console.log("foundUser:", foundUser);
    if (foundUser) {
      //  warn either option is already taken
      return;
    }

    bcrypt
      .genSalt(salt)
      .then((generatedSalt) => {
        return bcrypt.hash(password, generatedSalt);
      })
      .then((hashedPassword) => {
        return User.create({
          username,
          email,
          location,
          password: hashedPassword,
        });
      })
      .then((userCreated) => {
        console.log("userCreated:", userCreated);
        res.redirect("/");
      });
  });
  //   User.find()
  //     .or([{ username }, { email }])
  //     .then((foundUser) => {
  //       console.log("foundUser:", foundUser);
  //     });
});

// Handle Logout Request
router.get("/logout", (req, res) => {});

module.exports = router;
