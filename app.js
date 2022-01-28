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
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Web Service is running on ${port}...`));
