const Post = require("../models/Post.model");
const User = require("../models/User.model");
const router = require("express").Router();
const Comment = require("../models/Comment.model");

// * DOES NOT NEED
router.get("/post", (req, res) => {});

// * NEEDS AUTHENTICATED USER
router.get("/new-post", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }
  res.render("new-post");
});

// * NEEDS AUTHENTICATED USER
router.post("/new-post", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }
  const { body } = req.body;
  Post.create({
    type: "text",
    body,
    author: req.session.user._id,
  }).then((createdPost) => {
    // after you create a post, the property author was added to it, but the user is not aware of that, so we must edit the user and the post to the user's posts array
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
router.post("/:id/new-comment", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }
  const { id } = req.params;
  const { body } = req.body;
  Comment.create({
    body,
    post: id,
    author: req.session.user._id,
  }).then((newComment) => {
    Post.findByIdAndUpdate(id, {
      $addToSet: { comments: newComment._id },
    }).then(() => {
      res.redirect("/feed");
    });
  });
});

// * NEEDS AUTHENTICATED USER
router.put("/post/:id", (req, res) => {});

// * NEEDS AUTHENTICATED USER
router.delete("/post/:id", (req, res) => {});

module.exports = router;
