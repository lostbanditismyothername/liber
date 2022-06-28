const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Custum morgan token for better logs
morgan.token("body", (req) => JSON.stringify(req.body));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

module.exports = app;
