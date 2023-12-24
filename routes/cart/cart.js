const express = require("express");
const addToCart = require("../../controllers/cart/addToCart");
const isAuth = require("../../middlewares/isAuth");
const getCart = require("../../controllers/cart/getCart");
const router = express.Router();

router.post("/add", isAuth, addToCart);
router.get("/get", isAuth, getCart);

module.exports = router;
