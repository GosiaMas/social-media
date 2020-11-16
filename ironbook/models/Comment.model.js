const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  when: {
    type: Date,
    default: Date.now(),
  },
  body: String,
});

// !TODO FROM WHOM and WHERE TO

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
