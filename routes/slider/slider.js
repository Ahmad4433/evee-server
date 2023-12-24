const express = require("express");
const fileUpload = require("../../utils/fileUpload");
const addSlide = require("../../controllers/slider/addSlide");
const validateFile = require("../../validator/validateFile");
const getSlide = require("../../controllers/slider/getSlide");
const requestDomain = require("../../middlewares/requestDomain");
const updateSlide = require("../../controllers/slider/updateSlide");
const router = express.Router();

router.post("/add", fileUpload().single("image"), validateFile(true), addSlide);
router.get("/load", requestDomain, getSlide);
router.delete("/delete", updateSlide);
module.exports = router;
