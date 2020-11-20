const router = require("express");
const { route } = require("./profile");

// Retrieve my connections
// * Needs Authenticated and Authorized user
router.get("/my-connections", (req, res) => {});

// * Does not need auth
router.get("/search", (req, res) => {});

module.exports = router;
