const router = require("express").Router();

router.get("/profile");
router.get("/settings");
router.get("/update-profile");
router.put("/update-profile");
router.get("/update-password");
router.put("/update-password");
router.delete("/delete-profile");

module.exports = router;
