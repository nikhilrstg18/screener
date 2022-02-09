const express = require("express");
const indexController = require("../../controllers/index.controller");
const router = express.Router();

router.use("/indexes", indexController);

module.exports = router;
