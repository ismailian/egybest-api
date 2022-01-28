require("dotenv").config();
const express = require("express");

/* initialize new express app */
const app = express();

/** express configuration */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * route mappings
 * */
app.use("/api/v1", require("./routes/v1/v1"));

/* start web service */
app.listen(process.env.APP_PORT, () =>
  console.log(`Web Service is running on ${process.env.APP_PORT}...`)
);
