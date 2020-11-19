const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

// * NEEDS AUTHENTICATED USER
router.get("/settings", (req, res) => {
  if (!req.session.user) {
    // ! IT MEANS THAT THERE IS NOT USER LOGGED IN
    return res.redirect("/auth/login");
  }

  // Trying to get settings related to the user. In here we are also showing the posts
  User.findById(req.session.user._id)
    // `posts` is the property of the array of posts on the model
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

  // compareSync does the same as compare, but does it synchronously.
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
    // after we update user with the new data, here we are just making sure that we have the most up to date info in the session. This user now has a new password therefore we should have the new password also on the user session
    res.render("update-password", {
      message: "All good, successful, move away",
    });
  });
});

// * NEEDS AUTHENTICATED USER
router.delete("/delete-profile", (req, res) => {});

module.exports = router;
