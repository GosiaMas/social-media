const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: String,
  profilePic: {
    default:
      "https://icons-for-free.com/iconfiles/png/512/color+cinema+icons+Alien-1320567850488509407.png",
    type: String,
  },
  bio: String,
  location: {
    required: true,
    type: String,
  },
  birthday: Date,
  usageStatus: {
    enum: ["power user", "noobie", "middleware"],
    default: "noobie",
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

// !TODO FRIENDS, POSTS, INVITATIONS

const User = mongoose.model("User", userSchema);

module.exports = User;
