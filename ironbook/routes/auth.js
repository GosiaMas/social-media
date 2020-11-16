const { Router } = require("express");
const router = Router();

router.get("/login");
router.post("/login");
router.get("/signup");
router.post("/signup");
router.get("/logout");

module.exports = router;
