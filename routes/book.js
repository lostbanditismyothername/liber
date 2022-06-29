const express = require("express");
const bookController = require("../controllers/book");

const bookRouter = express.Router();

bookRouter.get("/books", bookController.getAllBooks);
bookRouter.get("/books/:id", bookController.getBook);
bookRouter.post("/books", bookController.addBook);
bookRouter.put("/books/:id", bookController.updateBook);
bookRouter.delete("/books/:id", bookController.deleteBook);

module.exports = bookRouter;
