const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");

const app = express();

// Custum morgan token for better logs
morgan.token("body", (req) => JSON.stringify(req.body));

// Connect to mongoDB
logger.info("Connecting to MongoDB..");

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => logger.error(error.message));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

module.exports = app;
