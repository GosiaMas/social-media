const router = require("express").Router();

router.get("/gallery");
router.post("/new-photo");
router.put("/:id");
router.delete("/:id");

module.exports = router;
