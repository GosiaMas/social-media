const { Router } = require("express");
const router = Router();

// Retrieve Login Page
router.get("/login", (req, res) => {});

// Retrieve Login Request
router.post("/login", (req, res) => {});

// Retrieve Signup Page
router.get("/signup", (req, res) => {});

// Retrieve Login Request
router.post("/signup", (req, res) => {});

// Handle Logout Request
router.get("/logout", (req, res) => {});

module.exports = router;
