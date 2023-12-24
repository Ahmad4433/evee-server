const express = require("express");
const addProduct = require("../../controllers/products/addProduct");
const fileUpload = require("../../utils/fileUpload");
const validateFile = require("../../validator/validateFile");
const getProduct = require("../../controllers/products/getProduct");
const requestDomain = require("../../middlewares/requestDomain");
const isAuth = require("../../middlewares/isAuth");
const router = express.Router();

router.post(
  "/add",
  fileUpload().array("image"),
  validateFile(false),
  addProduct
);
router.get("/get", requestDomain, getProduct);

module.exports = router;
