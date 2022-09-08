const express = require("express");
const Router = express.Router();
const Home = require("../Models/Home");
const cacheService = require("express-api-cache");

/** cache */
const cache = cacheService.cache;

/**
 * GET /api/v1/recent
 * ------------------
 * returns the latest released media.
 */
Router.get("/", cache("10 minutes"), async (req, res) => {
  let type = "all";

  // validate type param
  if (req.query.hasOwnProperty("type")) {
    if (!["movie", "show"].includes(req.query.type)) {
      return res.status(400).json({
        status: false,
        message: "Parameter [type] must be either (movie/show)",
      });
    }
    type = req.query.type;
  }

  const data = {};
  const recent = new Home();

  // movies and series
  if (type === "all") {
    data["movies"] = await recent.movies();
    data["series"] = await recent.shows();
  }

  // movies only
  if (type === "movie") {
    data["movies"] = await recent.movies();
  }

  // series only
  if (type === "show") {
    data["series"] = await recent.shows();
  }

  return res.status(200).json({
    status: true,
    data,
  });
});

module.exports = Router;
