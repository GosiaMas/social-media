const router = require("express").Router();

router.get("/post");
router.get("/new-post");
router.post("/new-post");
router.put("/like");
router.post("/new-comment");
router.put("/post/:id");
router.delete("/post/:id");

module.exports = router;
