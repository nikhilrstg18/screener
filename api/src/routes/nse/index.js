const express = require("express");
const nseController = require("../../controllers/nse.controller");
const router = express.Router();

router.use("/nse", nseController);

module.exports = router;
