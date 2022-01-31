require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

/* initialize new express app */
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 225, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/** express configuration */
app.use(cors());
app.use(limiter);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * route mappings
 * */
app.use("/api/v1", require("./routes/v1/v1"));

/* start web service */
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Web Service is running on ${port}...`));
