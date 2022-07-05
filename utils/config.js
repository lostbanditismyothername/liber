require("dotenv").config();

const { PORT } = process.env;

const MONGO_URI =
  // eslint-disable-next-line prettier/prettier
  process.env.NODE_ENV === "test" ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;

module.exports = {
  PORT,
  MONGO_URI,
};
