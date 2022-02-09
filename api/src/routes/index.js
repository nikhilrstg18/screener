const nseRoutes = require("./nse/index");

const configRoutes = (server) => {
  server.get("*", (req, res, next) => next());
  server.use("/api", nseRoutes);
};
module.exports = configRoutes;
