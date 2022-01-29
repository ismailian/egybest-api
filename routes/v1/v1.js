const express = require("express");
const Home = require("../../core/Models/Home");
const Search = require("../../core/Models/Search");
const Movie = require("../../core/Models/Movie");
const Show = require("../../core/Models/Show");
const Season = require("../../core/Models/Season");
const Episode = require("../../core/Models/Episode");

/** express router */
const Router = express.Router();

/*** BEGIN [routes] */

/**
 * GET /api/v1/recent
 * ------------------
 * returns the latest released media.
 */
Router.get("/recent", async (req, res) => {
  var type = "all";

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
    data["shows"] = await recent.shows();
  }

  // movies only
  if (type === "movie") {
    data["movies"] = await recent.movies();
  }

  // series only
  if (type === "show") {
    data["shows"] = await recent.shows();
  }

  return res.status(200).json({
    status: true,
    data,
  });
});

/**
 * GET /api/v1/search
 * ------------------
 * search for a media by keyword and returns the findings.
 */
Router.get("/search", async (req, res) => {
  const keyword = req.query.keyword?.trim();

  // validate keyword param
  if (!keyword || typeof keyword == "undefined") {
    return res
      .status(400)
      .json({ status: false, message: "Parameter [keyword] is required!" });
  }

  var type = "all";

  // validate type param
  if (req.query.hasOwnProperty("type")) {
    if (!["movie", "show"].includes(req.query.type)) {
      return res.status(400).json({
        status: false,
        message: "Parameter [type] can only be (movie/show)",
      });
    }
    type = req.query.type;
  }

  const data = {};
  const lookUp = new Search(keyword);

  /** all */
  if (type === "all") {
    data["all"] = await lookUp.all();
  }

  /** movies only */
  if (type === "movie") {
    data["movies"] = await lookUp.movies();
  }

  /** tv shows only */
  if (type === "show") {
    data["series"] = await lookUp.shows();
  }

  return res.status(200).json({
    status: true,
    data,
  });
});

/**
 * GET /api/v1/movie
 * ----------------
 * returns info about a movie
 */
Router.get("/movie", async (req, res) => {
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
 * GET /api/v1/show
 * ----------------
 * returns info about a tv show
 */
Router.get("/show", async (req, res) => {
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
 * GET /api/v1/seasons
 * ------------------
 * returns a list of seasons for a tv show.
 */
Router.get("/seasons", async (req, res) => {
  const name = req.query.name?.trim();

  // validate name param
  if (!name || typeof name == "undefined") {
    return res
      .status(400)
      .json({ status: false, message: "Parameter [name] is required!" });
  }

  const seasons = new Season(name);
  const seasonsData = await seasons.all();

  return res.status(200).json({
    status: true,
    data: seasonsData,
  });
});

/**
 * GET /api/v1/episodes
 * ------------------
 * returns a list of episodes for a tv show season.
 */
Router.get("/episodes", async (req, res) => {
  const name = req.query.name?.trim();
  const season = req.query.season?.trim();

  /** validate name param */
  if (!name || typeof name == "undefined") {
    return res
      .status(400)
      .json({ status: false, message: "Parameter [name] is required!" });
  }

  /** validate season param */
  if (!season || typeof season == "undefined" || isNaN(season)) {
    return res.status(400).json({
      status: false,
      message: "Parameter [season] is required and must be of type [integer]!",
    });
  }

  const episodes = new Episode(name, season);
  const episodesData = await episodes.all();

  return res.status(200).json({
    status: true,
    data: episodesData,
  });
});

/**
 * GET /api/v1/episode
 * ------------------
 * returns a list of episodes for a tv show season.
 */
Router.get("/episode", async (req, res) => {
  const name = req.query.name?.trim();
  const season = req.query.season?.trim();
  const episode = req.query.episode?.trim();

  /** validate name param */
  if (!name || typeof name == "undefined") {
    return res
      .status(400)
      .json({ status: false, message: "Parameter [name] is required!" });
  }

  /** validate season param */
  if (!season || typeof season == "undefined" || isNaN(season)) {
    return res.status(400).json({
      status: false,
      message: "Parameter [season] is required and must be of type [integer]!",
    });
  }

  /** validate episode param */
  if (!episode || typeof episode == "undefined" || isNaN(episode)) {
    return res.status(400).json({
      status: false,
      message: "Parameter [episode] is required and must be of type [integer]!",
    });
  }

  const episodes = new Episode(name, season);
  const episodeInfo = await episodes.get(episode);

  return res.status(200).json({
    status: true,
    data: episodeInfo,
  });
});

/*** END [routes] */

/** export */
module.exports = Router;
