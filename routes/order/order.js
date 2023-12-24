const express = require("express");
const placeOrder = require("../../controllers/order/placeOrder");
const isAuth = require("../../middlewares/isAuth");
const getOrder = require("../../controllers/order/getOrder");
const requestDomain = require("../../middlewares/requestDomain");

const router = express.Router();

router.post("/place", isAuth, requestDomain, placeOrder);
router.get("/list", isAuth, getOrder);

module.exports = router;
