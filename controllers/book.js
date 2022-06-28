const Book = require("../models/book");

// Errors are thrown with express-async-errors package, no need for catch
const getBooks = async (req, res) => {
  const users = await Book.find({});
  res.status(200).json(users);
};

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

module.exports = { getBooks, addBook };
