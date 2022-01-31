const express = require("express");
const Router = express.Router();
const cacheService = require("express-api-cache");
const Search = require("../Models/Season");

/** cache */
const cache = cacheService.cache;

/**
 * GET /api/v1/search
 * ------------------
 * search for a media by keyword and returns the findings.
 */
Router.get("/search", cache("10 minutes"), async (req, res) => {
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

module.exports = Router;
