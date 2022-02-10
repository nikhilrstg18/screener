const express = require("express");
const router = express.Router();
const nseService = require("../services/nse.service");

const getHandler = async (req, res) => {
  try {
    if (!req.query["i"]) {
      res.status(400).send("Missing index");
    }
    const index = req.query["i"].trim();
    const result = await nseService.getData(index);
    return res.status(result.status).send(result.data);
  } catch (err) {
    const { message, name, stack } = err;
    return res.status(500).send({ name, message, stack });
  }
};

router.get("/", getHandler);

module.exports = router;
