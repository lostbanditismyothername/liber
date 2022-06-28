const express = require("express");
const bookController = require("../controllers/book");

const bookRouter = express.Router();

bookRouter.get("/books", bookController.getBooks);
bookRouter.post("/books", bookController.addBook);

module.exports = bookRouter;
