const router = require("express").Router();

router.get("/profile", (req, res) => {});

router.get("/settings", (req, res) => {});

// * NEEDS AUTHENTICATED USER
router.get("/update-profile", (req, res) => {});

// * NEEDS AUTHENTICATED USER
router.put("/update-profile", (req, res) => {});

// * NEEDS AUTHENTICATED USER
router.get("/update-password", (req, res) => {});

// * NEEDS AUTHENTICATED USER
router.put("/update-password", (req, res) => {});

// * NEEDS AUTHENTICATED USER
router.delete("/delete-profile", (req, res) => {});

module.exports = router;
