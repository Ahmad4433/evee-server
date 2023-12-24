const express = require("express");
const addUser = require("../../controllers/user/addUser");
const loginUser = require("../../controllers/user/loginUser");
const router = express.Router();

router.post("/add", addUser);
router.post("/login", loginUser);
module.exports = router;
