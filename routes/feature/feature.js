const express = require("express");
const addFeature = require("../../controllers/feature/addFeature");
const fileUpload = require("../../utils/fileUpload");
const validateFile = require("../../validator/validateFile");
const updateFeature = require("../../controllers/feature/updateFeature");
const deletdFeature = require("../../controllers/feature/deleteFeature");
const router = express.Router();

router.post(
  "/add",
  fileUpload().single("image"),
  validateFile(true),
  addFeature
);
router.put(
  "/update",
  fileUpload().single("image"),

  updateFeature
);
router.delete("/delete", deletdFeature);

module.exports = router;
