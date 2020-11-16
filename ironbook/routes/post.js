const router = require("express").Router();

// * DOES NOT NEED
router.get("/post", (req, res) => {});

// * NEEDS AUTHENTICATED USER
router.get("/new-post", (req, res) => {});

// * NEEDS AUTHENTICATED USER
router.post("/new-post", (req, res) => {});

// * NEEDS AUTHENTICATED USER
router.put("/like", (req, res) => {});

// * NEEDS AUTHENTICATED USER
router.post("/new-comment", (req, res) => {});

// * NEEDS AUTHENTICATED USER
router.put("/post/:id", (req, res) => {});

// * NEEDS AUTHENTICATED USER
router.delete("/post/:id", (req, res) => {});

module.exports = router;
