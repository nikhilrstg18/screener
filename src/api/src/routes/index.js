const indexesRoutes = require("./index/index");

const configRoutes = (server) => {
  server.get("*", (req, res, next) => next());
  server.use("/api", indexesRoutes);
};
module.exports = configRoutes;
