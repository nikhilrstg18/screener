const express = require("express");
const cors = require("cors");
const configRoutes = require("./routes");
const app = express();

app.use(express.json());
app.set("json spaces", 2);

app.use(cors());

configRoutes(app);

module.exports = app;
