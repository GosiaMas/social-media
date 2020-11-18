const { Router } = require("express");
const router = Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const app = require("../app");
const salt = 10;

const shouldNotBeAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/");
  }
  next();
};

// function renderLogin(req, res) {
//   res.render("auth/login");
// }

// router.get("/login", shouldNotBeAuthenticated, renderLogin);
/* 
👋 The async await logic of the POST /login is below this file
*/

// Retrieve Login Page
router.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }
  next();
  res.render("auth/login");
});

// Retrieve Login Request
router.post("/login", shouldNotBeAuthenticated, (req, res) => {
  const { username, password } = req.body;

  if (username.length < 4 || password.length < 8) {
    //   error handling
  }

  User.findOne({ username }).then((user) => {
    if (!user) {
      // please provide a correct username
      return; //   error handle and say wrong username
    }
    bcrypt.compare(password, user.password).then((isSamePassword) => {
      if (!isSamePassword) {
        // wrong password. try again
        //  error handle and say wrong password
        return;
      }
      req.session.user = user;
      res.redirect("/");
    });
  });
});

// Retrieve Signup Page
router.get("/signup", shouldNotBeAuthenticated, (req, res) => {
  res.render("auth/signup");
});

// Retrieve Login Request
router.post("/signup", shouldNotBeAuthenticated, (req, res) => {
  console.log(req.body);
  const { username, email, password, location } = req.body;

  if (
    email.length < 4 ||
    !email.includes("@") ||
    username.length < 5 ||
    password.length < 8 ||
    !location
  ) {
    return res.render("auth/signup", {
      errorMessage: "Please fill out everything in sight",
    });
    // send error to frontend
  }

  /* 
  Password strength validator
  */

  User.findOne({ $or: [{ username }, { email }] })
    .then((foundUser) => {
      console.log("foundUser:", foundUser);
      if (foundUser) {
        res.render("auth/signup", {
          errorMessage: "Either username or email is already taken",
        });
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
    })
    .catch((err) => {
      console.log("err:", err);
      res.render("auth/signup", { errorMessage: err.message });
    });
  //   User.find()
  //     .or([{ username }, { email }])
  //     .then((foundUser) => {
  //       console.log("foundUser:", foundUser);
  //     });
});

// router.use((req, res, next) => {
//   if (!req.session.user) {
//     return res.redirect("/auth/signup");
//   }
//   next();
// });
const checkAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/auth/signup");
  }
  next();
};
// // Handle Logout Request
router.get("/logout", checkAuth, function (req, res) {
  req.session.destroy((err) => {
    if (err) {
      // error handleing
    }
    res.redirect("/");
  });
});

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
