const logger = require("./logger");

// Log details for each req
const requestLogger = (req, _res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:", req.path);
  logger.info("Body:", req.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ Error: "Unknown Endpoint" });
};

const errorHandler = (error, _req, res, next) => {
  logger.error(`Error: ${error.message}`);
  res.status(error.status || 400).send(error.message);

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
