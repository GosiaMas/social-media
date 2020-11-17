const Post = require("../models/Post.model");

const router = require("express").Router();

// * Global Feed. No need to check for MY connections
router.get("/feed", (req, res) => {
  // Post.find().sort({})
});

module.exports = router;
