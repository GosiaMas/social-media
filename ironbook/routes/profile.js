const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

// * NEEDS AUTHENTICATED USER
router.get("/settings", (req, res) => {
  if (!req.session.user) {
    // ! IT MEANS THAT THERE IS NOT USER LOGGED IN
    return res.redirect("/auth/login");
  }
  User.findById(req.session.user._id)
    .populate("posts")
    .then((myUser) => {
      console.log("myUser:", myUser);
      res.render("settings", { user: myUser, hello: "world" });
    });
});

// * NEEDS AUTHENTICATED USER
router.get("/update-profile", (req, res) => {});

// * NEEDS AUTHENTICATED USER
router.put("/update-profile", (req, res) => {
  // req.body accesses input data
});

// * NEEDS AUTHENTICATED USER
router.get("/update-password", (req, res) => {
  if (!req.session.user) {
    // ! IT MEANS THAT THERE IS NOT USER LOGGED IN
    return res.redirect("/auth/login");
  }
  res.render("update-password", { user: req.session.user });
});

// * NEEDS AUTHENTICATED USER
router.post("/update-password", (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    //   stop and wait a minute
  }

  const isSamePassword = bcrypt.compareSync(
    oldPassword,
    req.session.user.password
  );

  if (!isSamePassword) {
    //   ERROR HANDLING HERE
  }

  const hashingAlgorithm = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, hashingAlgorithm);

  User.findByIdAndUpdate(
    req.session.user._id,
    { password: hashedPassword },
    { new: true }
  ).then((newAndUpdatedUser) => {
    req.session.user = newAndUpdatedUser;
    res.render("update-password", {
      message: "All good, successful, move away",
    });
  });
});

// * NEEDS AUTHENTICATED USER
router.delete("/delete-profile", (req, res) => {});

module.exports = router;
