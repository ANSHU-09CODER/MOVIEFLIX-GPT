const handler = require("../api/tmdb");

module.exports = function (app) {
  app.get("/api/tmdb", (req, res) => handler(req, res));
};