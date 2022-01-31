const express = require("express");
const Router = express.Router();
const cacheService = require("express-api-cache");
const Trend = require("../Models/Trend");
const Show = require("../Models/Show");
const Season = require("../Models/Season");
const Episode = require("../Models/Episode");

/** cache */
const cache = cacheService.cache;

/**
 * GET series/recent
 */
Router.get("/recent", cache("10 minutes"), async (req, res) => {
  const recent = new Home();
  const data = {};
  data["series"] = await recent.shows();

  return res.status(200).json({
    status: true,
    data,
  });
});

/**
 * GET series/trending
 */
Router.get("/trending", cache("10 minutes"), async (req, res) => {
  const trend = new Trend();
  const data = {};
  data["series"] = await trend.shows();

  return res.status(200).json({
    status: true,
    data,
  });
});

/**
 * GET series/find
 */
Router.get("/find", cache("10 minutes"), async (req, res) => {
  const name = req.query.name?.trim();

  // validate name parameter
  if (!name || typeof name == "undefined") {
    return res
      .status(400)
      .json({ status: false, message: "Parameter [name] is required." });
  }

  const show = new Show(name);
  var data = await show.get();

  return res.status(200).json({
    status: true,
    data,
  });
});

/**
 * GET series/search
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
  data["series"] = await lookUp.shows();

  return res.status(200).json({
    status: true,
    data,
  });
});

/**
 * GET series/season
 */
Router.get("/season", cache("10 minutes"), async (req, res) => {
  const name = req.query.name?.trim();
  const seasonNumber = req.query.seasonNumber?.trim();

  // validate name parameter
  if (!name || typeof name == "undefined") {
    return res.status(400).json({
      status: false,
      message: "Parameter [name] is required.",
    });
  }

  // validate seasonNumber parameter
  if (
    !seasonNumber ||
    typeof seasonNumber == "undefined" ||
    isNaN(seasonNumber)
  ) {
    return res.status(400).json({
      status: false,
      message: "Parameter [season] is required.",
    });
  }

  const data = {};
  const season = new Season(name, seasonNumber);
  data = await season.get();

  return res.status(200).json({
    status: true,
    data,
  });
});

/**
 * GET series/episode
 */
Router.get("/episode", cache("10 minutes"), async (req, res) => {
  const name = req.query.name?.trim();
  const seasonNumber = req.query.seasonNumber?.trim();
  const episodeNumber = req.query.episodeNumber?.trim();

  // validate name parameter
  if (!name || typeof name == "undefined") {
    return res.status(400).json({
      status: false,
      message: "Parameter [name] is required.",
    });
  }

  // validate seasonNumber parameter
  if (
    !seasonNumber ||
    typeof seasonNumber == "undefined" ||
    isNaN(seasonNumber)
  ) {
    return res.status(400).json({
      status: false,
      message: "Parameter [season] is required.",
    });
  }

  // validate episodeNumber parameter
  if (
    !episodeNumber ||
    typeof episodeNumber == "undefined" ||
    isNaN(episodeNumber)
  ) {
    return res.status(400).json({
      status: false,
      message: "Parameter [episode] is required.",
    });
  }

  const data = {};
  const episode = new Episode(name, seasonNumber, episodeNumber);
  data = await episode.get();

  return res.status(200).json({
    status: true,
    data,
  });
});

module.exports = Router;
