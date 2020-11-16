const { route } = require("./profile");

const router = require("express").Router();

// * Global Feed. No need to check for MY connections
router.get("/feed");

module.exports = router;
