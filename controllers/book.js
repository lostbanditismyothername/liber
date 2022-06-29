const Book = require("../models/book");

// HTTP errors are being handled with express-async-errors
// therefore no need to write catch

// Get all books
const getAllBooks = async (req, res) => {
  const users = await Book.find({});
  res.status(200).json({ users: users });
};

// Get a book by id
const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
};

// Insert a new book
const addBook = async (req, res) => {
  const { body } = req;
  const { title, author, language, likes } = body;
  const newBookObj = new Book({
    title,
    author,
    language,
    likes,
  });

  const newBook = await newBookObj.save();
  res.status(201).json(newBook);
};

// Update a book
const updateBook = async (req, res) => {
  const { id } = req.params;
  const newBookObj = req.body;

  const updatedBook = await Book.findByIdAndUpdate(id, newBookObj, {
    new: true,
  });
  res.json(updatedBook);
};

// Delete book
const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  res.status(204);
};

module.exports = { getAllBooks, addBook, updateBook, getBook, deleteBook };
