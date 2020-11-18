const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  // console.log(req.session);
  const { user } = req.session;
  console.log("user:", user);
  // req.session.views = 1;
  res.render("index", { user });
});

module.exports = router;
// s%3AYEcpnnMiTJvNuYCTo3792TXMOWc_XbXo.a5exQrWBgzvWssyj2HVg2xCKWzx9rORWxOJsWICIIO4
