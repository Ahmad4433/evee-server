const express = require("express");
const addServices = require("../../controllers/services/addServices");
const updateService = require("../../controllers/services/updateService");
const deletedService = require("../../controllers/services/deleteService");
const router = express.Router();

router.post("/add", addServices);
router.put("/update", updateService);
router.delete("/delete", deletedService);
module.exports = router;
