const express = require("express");
const addReview = require("../../controllers/review/addNewReview");
const fileUpload = require("../../utils/fileUpload");
const validateFile = require("../../validator/validateFile");
const isAuth = require("../../middlewares/isAuth");
const router = express.Router();

router.post("/add", isAuth, fileUpload().array("image"), addReview);

module.exports = router;
