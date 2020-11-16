const router = require("express");
const { route } = require("./profile");

router.get("/my-connections");
router.get("/search");

module.exports = router;
