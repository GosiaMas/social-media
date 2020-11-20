const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  when: {
    type: Date,
    default: Date.now(),
  },
  body: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

// !TODO FROM WHOM and WHERE TO

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
