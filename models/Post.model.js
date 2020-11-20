const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  when: {
    type: Date,
    default: new Date(),
  },
  type: {
    type: String,
    enum: ["text", "image"],
  },
  body: String,
  image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

// !TODO WHOM, COMMENTS, LIKES

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
