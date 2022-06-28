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

// eslint-disable-next-line consistent-return
const errorHandler = (error, _req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ Error: "Malformatted ID" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ Error: Error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
