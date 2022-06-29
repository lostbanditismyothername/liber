const bookRouter = require("express").Router();
const bookController = require("../controllers/book");

bookRouter.get("/", bookController.getAllBooks);
bookRouter.get("/:id", bookController.getBook);
bookRouter.post("/", bookController.createBook);
bookRouter.put("/:id", bookController.updateBook);
bookRouter.delete("/:id", bookController.deleteBook);

module.exports = bookRouter;
