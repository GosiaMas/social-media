const router = require("express").Router();

// * Does not need authenticated user
router.get("/:username", (req, res) => {});

router.get("/:username/gallery", (req, res) => {});

module.exports = router;
