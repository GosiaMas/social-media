const Post = require("../models/Post.model");
const User = require("../models/User.model");
const router = require("express").Router();

// * DOES NOT NEED
router.get("/post", (req, res) => {});

// * NEEDS AUTHENTICATED USER
router.get("/new-post", (req, res) => {
  res.render("new-post");
});

// * NEEDS AUTHENTICATED USER
router.post("/new-post", (req, res) => {
  const { body } = req.body;
  Post.create({
    type: "text",
    body,
    author: req.session.user._id,
  }).then((createdPost) => {
    console.log("createdPost:", createdPost);
    User.findByIdAndUpdate(
      req.session.user._id,
      {
        $addToSet: { posts: createdPost._id },
      },
      { new: true }
    ).then((newAndUpdatedUser) => {
      console.log("newAndUpdatedUser:", newAndUpdatedUser);
      res.redirect("/profile/settings");
    });
  });
});

// * NEEDS AUTHENTICATED USER
router.put("/like", (req, res) => {});

// * NEEDS AUTHENTICATED USER
router.post("/new-comment", (req, res) => {});

// * NEEDS AUTHENTICATED USER
router.put("/post/:id", (req, res) => {});

// * NEEDS AUTHENTICATED USER
router.delete("/post/:id", (req, res) => {});

module.exports = router;
