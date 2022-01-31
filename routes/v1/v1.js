const express = require("express");
const Router = express.Router();

/**
 * Recent Handler
 */
Router.use("/recent", require("../../core/Handlers/RecentHandler"));

/**
 * Search Handler
 */
Router.use("/search", require("../../core/Handlers/SearchHandler"));

/**
 * Movies Handler
 */
Router.use("/movies", require("../../core/Handlers/MovieHandler"));

/**
 * Series Handler
 */
Router.use("/series", require("../../core/Handlers/ShowHandler"));

/** export */
module.exports = Router;
