const express = require("express");
const cors = require("cors");
const configRoutes = require("./routes");
const app = express();

app.use(express.json());
app.set("json spaces", 2);

app.use(cors());

configRoutes(app);
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render("error");
});

module.exports = app;
