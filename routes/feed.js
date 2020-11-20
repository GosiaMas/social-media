const Post = require("../models/Post.model");

const router = require("express").Router();

// * Global Feed. No need to check for MY connections
router.get("/", (req, res) => {
  Post.find()
    .sort({ when: -1 })
    .limit(10)
    .populate("comments")
    .then((posts) => {
      console.log("posts:", posts[0].comments);
      res.render("feeds", { posts });
    });
});

module.exports = router;
