const { Router } = require("express");
const router = Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const salt = 10;

/* 
👋 The async await logic of the POST /login is below this file
*/

// Retrieve Login Page
router.get("/login", (req, res) => {
  res.render("auth/login");
});

// Retrieve Login Request
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username.length < 4 || password.length < 8) {
    //   error handling
  }

  User.findOne({ username }).then((user) => {
    if (!user) {
      return; //   error handle and say wrong username
    }
    bcrypt.compare(password, user.password).then((isSamePassword) => {
      if (!isSamePassword) {
        //  error handle and say wrong password
        return;
      }

      res.redirect("/");
    });
  });
});

// Retrieve Signup Page
router.get("/signup", (req, res) => {
  console.log("SIGNUP REQ");
  res.render("auth/signup");
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
        req.session.user = userCreated;
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

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   if (username.length < 4 || password.length < 8) {
//     //   error handling
//   }
//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return;
//     }
//     const isSamePassword = await bcrypt.compare(password, user.password);
//     if (!isSamePassword) {
//       //  error handle and say wrong password
//       return;
//     }

//     res.redirect("/");
//   } catch (error) {
//     console.log(error);
//   }
// });
