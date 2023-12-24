const express = require("express");
const addLike = require("../../controllers/likes/addLike");
const removeLike = require("../../controllers/likes/removeLike");
const router = express.Router();

router.post("/add", addLike);
router.post("/remove", removeLike);

module.exports = router;
