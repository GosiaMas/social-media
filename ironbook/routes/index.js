const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  const { user } = req.session;
  console.log("user:", user);
  // if no logged in user, user is going to be undefined, so its fine
  res.render("index", { user });
});

module.exports = router;
// s%3AYEcpnnMiTJvNuYCTo3792TXMOWc_XbXo.a5exQrWBgzvWssyj2HVg2xCKWzx9rORWxOJsWICIIO4
