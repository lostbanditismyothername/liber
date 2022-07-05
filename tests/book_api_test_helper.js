const Book = require("../models/book");

// Mock data
const initialBooks = [
  {
    title: "The Alchemist",
    author: "Paolo Coelho",
    language: "english",
    likes: 5,
  },
  {
    title: "Crime & Punishment",
    author: "Dostoyevski",
    language: "russian",
    likes: 5,
  },
  {
    title: "For Whom the Bell Tolls",
    author: "E. Hemingway",
    language: "english",
    likes: 5,
  },
  {
    title: "Les Miserables",
    author: "V. Hugo",
    language: "english",
    likes: 5,
  },
];

// create non existing id error
const nonExistingID = async () => {
  const book = new Book({
    title: "book to remove soon",
    author: "oblivious",
    language: "spanish",
    likes: 1,
  });

  await book.save();
  await book.remove();

  return book._id.toString();
};

// get the books in db
const booksInDB = async () => {
  const books = await Book.find({});
  return books.map((book) => book.toJSON());
};

module.exports = {
  nonExistingID,
  booksInDB,
  initialBooks,
};
