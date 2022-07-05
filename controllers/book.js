const Book = require("../models/book");

// HTTP errors are being handled with express-async-errors
// therefore no need to write catch

// Get all
const getAllBooks = async (req, res) => {
  const books = await Book.find({});
  res.status(200).json({ books: books });
};

// Get
const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404).send(`No such book with the ID: ${req.params.id} `);
  } else {
    res.status(200).json(book);
  }
};

// Create
const createBook = async (req, res) => {
  const { title, author, language, likes } = req.body;
  const newBookObj = new Book({
    title,
    author,
    language,
    likes,
  });

  const newBook = await newBookObj.save();
  res.status(201).json(newBook);
};

// Update
const updateBook = async (req, res) => {
  const bookID = req.params.id;
  const book = Book.findById(bookID);
  const newBookObj = req.body;

  if (!book) {
    res.status(400).send(`No such book with the ID: ${bookID}`);
  } else {
    const updatedBook = await Book.findByIdAndUpdate(bookID, newBookObj, {
      new: true,
    });
    res.json(updatedBook);
  }
};

// Delete
const deleteBook = async (req, res) => {
  const bookID = req.params.id;
  const book = await Book.findById(bookID);

  if (!book) {
    res.status(400).send(`No such book with the ID: ${bookID}`);
  } else {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).end();
  }
};

module.exports = { getAllBooks, createBook, updateBook, getBook, deleteBook };
