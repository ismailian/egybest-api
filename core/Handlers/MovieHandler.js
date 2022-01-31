const express = require("express");
const Router = express.Router();
const cacheService = require("express-api-cache");
const Home = require("../Models/Home");
const Search = require("../Models/Search");
const Trend = require("../Models/Trend");
const Movie = require("../Models/Movie");

/** cache */
const cache = cacheService.cache;
/**
 * GET movies/recent
 */
Router.get("/recent", cache("10 minutes"), async (req, res) => {
  const recent = new Home();
  const data = {};
  data["movies"] = await recent.movies();

  return res.status(200).json({
    status: true,
    data,
  });
});

/**
 * GET movies/trending
 */
Router.get("/trending", cache("10 minutes"), async (req, res) => {
  const trend = new Trend();
  const data = {};
  data["movies"] = await trend.movies();

  return res.status(200).json({
    status: true,
    data,
  });
});

/**
 * GET movies/find
 */
Router.get("/find", cache("10 minutes"), async (req, res) => {
  const name = req.query.name?.trim();

  // validate name parameter
  if (!name || typeof name == "undefined") {
    return res
      .status(400)
      .json({ status: false, message: "Parameter [name] is required." });
  }

  const movie = new Movie(name);
  var data = await movie.get();

  return res.status(200).json({
    status: true,
    data,
  });
});

/**
 * GET movies/search
 */
Router.get("/search", cache("10 minutes"), async (req, res) => {
  const name = req.query.name?.trim();

  // validate name param
  if (!name || typeof name == "undefined") {
    return res
      .status(400)
      .json({ status: false, message: "Parameter [name] is required!" });
  }

  const lookUp = new Search(name);
  const data = {};
  data["movies"] = await lookUp.movies();

  return res.status(200).json({
    status: true,
    data,
  });
});

module.exports = Router;
